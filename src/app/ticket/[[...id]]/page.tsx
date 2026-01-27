"use client";

import Button from "@app/components/Button";
import { CalculationContextProvider } from "@app/contexts/calculationContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Expenses from "./Expenses";
import Participants from "./Participants";
// import { EXPENSES, PARTICIPANTS } from "@root/mockedData";
import { RoutesEnum } from "@/app/enums/routes";
import {
  addCurrentTicket,
  selectCurrentTicket,
} from "@/app/redux/slices/currentTicketSlice";
import Spinner from "@/app/svgs/Spinner";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@app/hooks/useMediaQueryState";
import { getTicket } from "@app/lib/fetchData";
import { selectUser } from "@app/redux/slices/userSlice";
import { ITicket } from "@app/types/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SaveButton from "./SaveButton";
import SaveExpenseModal from "./SaveExpenseModal";
import Tabs from "./Tabs";

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
    initialState as ITicket,
  );

  const [ticketNotFound, setTicketNotFound] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const savedTicketData = useRef({});

  const currentTicket = useSelector(selectCurrentTicket);

  // In mobile we show only one section at the time
  const [isParticipantsSelected, setIsParticipantsSelected] = useState(true);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });
  const dispatch = useDispatch();
  const t = useTranslations("ticket");

  const calculateDisabled = useMemo(() => {
    return ticketData.participants.length < 2 || !ticketData.expenses.length;
  }, [ticketData.expenses.length, ticketData.participants.length]);

  const redirectToResults = useCallback(() => {
    if (calculateDisabled) return;

    // If the ticket id exists it means it's saved, so we can fetch it in the results page
    if (ticketData.id) {
      router.push(`${RoutesEnum.Results}/${ticketData.id}`);
    } else {
      // If the ticket is not saved we store it in redux
      dispatch(addCurrentTicket(ticketData));

      router.push(`${RoutesEnum.Results}/local`);
    }
  }, [calculateDisabled, router, ticketData, dispatch]);

  const fetchTicket = useCallback(async (ticketId: string) => {
    setIsLoading(true);

    const ticket = await getTicket({ ticketId: ticketId });

    if (ticket) {
      setTicketData(ticket);
      savedTicketData.current = ticket;
    } else {
      return setTicketNotFound(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (params?.id?.length) {
      // If id is local we use the ticket in redux
      if (params.id[0] === "local") {
        if (currentTicket) {
          setTicketData(currentTicket);
        }
      } else {
        fetchTicket(params.id[0]);
      }
    }
  }, [params.id, fetchTicket, currentTicket]);

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
        <SaveExpenseModal
          handleClose={() => setShowSaveModal(false)}
          updateSavedData={(data) => {
            setTicketData(data);
            savedTicketData.current = data;
          }}
        />
      )}
      <div id="portal" />
    </CalculationContextProvider>
  );
};

export default Page;
