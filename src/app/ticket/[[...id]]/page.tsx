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
import { useParams } from "next/navigation";
import Link from "next/link";
import SaveExpenseModal from "./SaveExpenseModal";
import { ITicket } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/redux/slices/userSlice";
import SaveButton from "./SaveButton";

const Page = () => {
  const user = useSelector(selectUser);

  const initialState = {
    id: "",
    name: "",
    date: 0,
    notes: undefined,
    participants: [], //PARTICIPANTS,
    expenses: [], //EXPENSES,
    userId: "",
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

  useEffect(() => {
    if (user) {
      setTicketData((curr) => {
        const _curr = { ...curr };

        _curr.userId = user.id;

        return _curr;
      });
    }
  }, [user]);

  if (ticketNotFound) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center space-y-4">
        <h1 className="title">The ticket was not found, sorry (404)</h1>

        <Link href="/ticket">
          <button className="bg-none subtitle">Create one</button>
        </Link>
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
          <Participants />
          <Expenses />
        </div>

        <div className="w-full flex justify-center space-x-6">
          <SaveButton openModal={() => setShowSaveModal(true)} />

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
