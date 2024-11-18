"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { ITicket } from "@app/types/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@app/redux/slices/userSlice";
import SaveButton from "./SaveButton";
import { getTicket } from "@app/lib/fetchData";
import { useTranslations } from "next-intl";
import Spinner from "@/app/svgs/Spinner";

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
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  // In mobile we show only one section at the time
  const [isParticipantsSelected, setIsParticipantsSelected] = useState(true);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });
  const t = useTranslations("ticket");

  const calculateDisabled = useMemo(() => {
    return ticketData.participants.length < 2 || !ticketData.expenses.length;
  }, [ticketData.expenses.length, ticketData.participants.length]);

  const redirectToResults = useCallback(() => {
    if (calculateDisabled) return;

    localStorage.setItem("currentTicket", JSON.stringify(ticketData));

    router.push("/results");
  }, [calculateDisabled, router, ticketData]);

  const fetchTicket = useCallback(async (ticketId: string) => {
    setIsLoading(true);

    const ticket = await getTicket({ ticketId: ticketId });

    if (ticket) {
      setTicketData(ticket);
    } else {
      return setTicketNotFound(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (params?.id?.length) {
      fetchTicket(params.id[0]);
    }
  }, [params.id, fetchTicket]);

  useEffect(() => {
    if (user) {
      setTicketData((curr) => {
        const _curr = { ...curr };

        _curr.userId = user.id;

        return _curr;
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center absolute top-0 right-0 bottom-0 left-0">
        <Spinner className="w-20" />
      </div>
    );
  }

  if (ticketNotFound) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center space-y-4">
        <h1 className="title">{t("ticketNotFound")}</h1>

        <Link href="/ticket">
          <button className="bg-none subtitle">{t("createOne")}</button>
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
          {t("allParticipantsAndExpenses")}
        </h1>
        {!lgScreen && <Tabs />}
        <div className="flex lg:space-x-40 lg:justify-center lg:mt-10 w-full overflow-hidden lg:overflow-visible">
          <Participants />
          <Expenses />
        </div>

        <div className="w-full grid grid-cols-2 max-w-80 justify-center gap-6">
          <SaveButton openModal={() => setShowSaveModal(true)} />

          <Button
            text={t("calculate")}
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
