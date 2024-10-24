"use client";
import { useEffect, useState } from "react";
import { CalculationContextProvider } from "@app/contexts/calculationContext";
import Expenses from "./Expenses";
import Participants from "./Participants";
import Button from "@app/components/Button";
import { PARTICIPANTS } from "@root/mockedData";
import Tabs from "./Tabs";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@app/hooks/useMediaQueryState";
import Image from "next/image";
import Save from "@public/images/save.svg";
import { useParams } from "next/navigation";
import Link from "next/link";
import SaveExpenseModal from "./SaveExpenseModal";

const Page = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [date, setDate] = useState<number | null>(null);
  const [description, setDescription] = useState<string>();
  const [ticketNotFound, setTicketNotFound] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const params = useParams();

  const [isLeftSelected, setIsLeftSelected] = useState(true); // TODO: Rename this to isParticipantsSelected or something

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

  useEffect(() => {
    if (params?.id?.length) {
      const savedData = localStorage.getItem(`ticket_${params.id[0]}`);

      if (!savedData) return setTicketNotFound(true);

      console.log(JSON.parse(savedData));
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
        participants,
        setParticipants,
        lgScreen,
        isTouch,
        isLeftSelected,
        setIsLeftSelected,
      }}
    >
      <div className="min-h-screen w-screen max-w-lg mx-auto lg:min-w-[100vh] flex flex-col items-center space-y-8 lg:space-y-14 3xl:space-y-20 pt-10 3xl:pt-20 px-10">
        <h1 className="title text-center block">
          Add all participants and expenses
        </h1>
        {!lgScreen && <Tabs />}
        <div className="flex lg:space-x-40 lg:justify-center lg:mt-10 w-full overflow-hidden lg:overflow-visible">
          <Participants />
          <Expenses />
        </div>

        {/* TODO: Disable button if there are less than 2 participants or no expenses */}
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
          <Button text="Calculate" onClick={() => console.log("first")} />
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
