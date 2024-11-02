"use client";
import { useEffect, useMemo, useState } from "react";
import { CalculationContextProvider } from "@app/contexts/calculationContext";
import Expenses from "./Expenses";
import Participants from "./Participants";
import Button from "@app/components/Button";
// import { EXPENSES, PARTICIPANTS } from "@root/mockedData";
import Tabs from "./Tabs";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@app/hooks/useMediaQueryState";
import Image from "next/image";
import Save from "@public/images/save.svg";
import { useParams } from "next/navigation";
import Link from "next/link";
import SaveExpenseModal from "./SaveExpenseModal";
import { ITicket } from "@/app/types/types";
import { useRouter } from "next/navigation";

const Page = () => {
  const initialState = {
    id: "",
    name: "",
    date: 0,
    notes: undefined,
    participants: [], //PARTICIPANTS,
    expenses: [], //EXPENSES,
  };

  const [ticketData, setTicketData] = useState<ITicket>(
    initialState as ITicket
  );

  const [ticketNotFound, setTicketNotFound] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const params = useParams();
  const router = useRouter();

  // In mobile we show only one section at the time
  const [isParticipantsSelected, setIsParticipantsSelected] = useState(true);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

  const calculateDisabled = useMemo(() => {
    return ticketData.participants.length < 2 || !ticketData.expenses.length;
  }, [ticketData.expenses.length, ticketData.participants.length]);

  const redirectToResults = () => {
    localStorage.setItem("currentTicket", JSON.stringify(ticketData));

    router.push("/results");
  };

  useEffect(() => {
    if (params?.id?.length) {
      const savedData = localStorage.getItem(`tickets`);

      if (!savedData) return setTicketNotFound(true);

      const tickets = JSON.parse(savedData);

      const indexOfTicket = tickets
        .map((ticket: ITicket) => ticket.id)
        .indexOf(params.id[0]);

      if (indexOfTicket >= 0) {
        setTicketData(tickets[indexOfTicket]);
      } else {
        return setTicketNotFound(true);
      }
    }
  }, [params.id]);

  // TODO: Add proper 404 screen with button to create a ticket or go back to home
  if (ticketNotFound) {
    return (
      <div className="">
        <h1>The ticket was not found, sorry</h1>
        <Link href="/ticket">Create one</Link>
      </div>
    );
  }

  return (
    <CalculationContextProvider
      state={{
        ticketData,
        setTicketData,
        lgScreen,
        isTouch,
        isParticipantsSelected,
        setIsParticipantsSelected,
      }}
    >
      <div className="layout max-w-lg mx-auto flex flex-col items-center space-y-8 lg:space-y-14 3xl:space-y-20">
        <h1 className="title text-center block">
          Add all participants and expenses
        </h1>
        {!lgScreen && <Tabs />}
        <div className="flex lg:space-x-40 lg:justify-center lg:mt-10 w-full overflow-hidden lg:overflow-visible">
          {/* TODO: What happens if you delete a participant that has been added to some expenses? */}
          <Participants />
          <Expenses />
        </div>

        <div className="w-full flex justify-center space-x-6">
          <Button
            text={
              <div className="flex space-x-2 items-center">
                <span>Save</span>
                <Image src={Save} alt="Save" className="w-4" />
              </div>
            }
            onClick={() => setShowSaveModal(true)}
          />

          <Button
            text="Calculate"
            onClick={redirectToResults}
            disabled={calculateDisabled}
          />
        </div>
      </div>

      {showSaveModal && (
        <SaveExpenseModal handleClose={() => setShowSaveModal(false)} />
      )}
      <div id="portal" />
    </CalculationContextProvider>
  );
};

export default Page;
