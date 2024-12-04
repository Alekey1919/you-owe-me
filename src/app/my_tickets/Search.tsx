import React, { useCallback, useMemo, useState } from "react";
import Button from "../components/Button";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/themeSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { selectUser } from "../redux/slices/userSlice";
import { ITicket } from "../types/types";
import toast from "react-hot-toast";

const Search = ({
  isOpen,
  setTickets,
  searchActive,
  setSearchActive,
  clearSearch,
}: {
  isOpen: boolean;
  setTickets: (tickets: ITicket[]) => void;
  searchActive: boolean;
  setSearchActive: (v: boolean) => void;
  clearSearch: () => void;
}) => {
  const [ticketName, setTicketName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const user = useSelector(selectUser);

  const t = useTranslations("myTickets");
  const theme = useSelector(selectTheme);

  const searchDisabled = useMemo(() => {
    if (startDate) {
      if (endDate) {
        // Disabled if until date is before from date
        return Date.parse(startDate) > Date.parse(endDate);
      } else {
        // If only from date is specified we include all tickets moving forward
        return false;
      }
    }

    return !ticketName;
  }, [startDate, ticketName, endDate]);

  const handleSearch = useCallback(async () => {
    try {
      let ticketsQuery = query(collection(db, "tickets"));

      // Adding filters dynamically
      if (user?.id) {
        ticketsQuery = query(ticketsQuery, where("userId", "==", user.id));
      }
      if (ticketName) {
        ticketsQuery = query(ticketsQuery, where("name", "==", ticketName));
      }
      if (startDate) {
        ticketsQuery = query(
          ticketsQuery,
          where("date", ">=", Date.parse(startDate))
        );

        // Using endDate if specified or today
        const _endDate = endDate ? Date.parse(endDate) : new Date().getTime();

        ticketsQuery = query(ticketsQuery, where("date", "<=", _endDate));
      }

      const querySnapshot = await getDocs(ticketsQuery);

      const tickets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTickets(tickets as ITicket[]);
      setSearchActive(true);
    } catch (error) {
      console.error("Error querying tickets: ", error);
      toast.error(t("somethingWentWrong"));
    }
  }, [
    endDate,
    setSearchActive,
    setTickets,
    startDate,
    ticketName,
    user?.id,
    t,
  ]);

  return (
    <div
      className={twMerge(
        "flex flex-col space-y-4 items-center transition-height !mt-0 w-full translate-y-3",
        "lg:w-1/4 lg:translate-y-5 3xl:w-1/4 4xl:w-1/5",
        isOpen && "open lg:!mb-2 lg:pb-2"
      )}
    >
      <div className="flex space-x-5 w-full">
        <label htmlFor="name" className="shrink-0">
          {t("ticketName")}:
        </label>
        <input
          type="text"
          className="bg-transparent border-0 border-b-[1px] border-b-accent w-full"
          value={ticketName}
          onChange={(e) => setTicketName(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <label htmlFor="">From:</label>
          <input
            type="date"
            placeholder="none"
            className={twMerge(
              "bg-transparent",
              !startDate && "text-transparent"
            )}
            style={{ colorScheme: theme }}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-between">
          <label htmlFor="">Until:</label>
          <input
            type="date"
            className={twMerge(
              "bg-transparent",
              !endDate && "text-transparent"
            )}
            style={{ colorScheme: theme }}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          text={t("search")}
          disabled={searchDisabled}
          onClick={handleSearch}
        />
        <Button
          text={t("clear")}
          onClick={clearSearch}
          styles={twMerge(
            !searchActive && "w-0 transition-all duration-300 !p-0 !outline-0"
          )}
        />
      </div>
    </div>
  );
};

export default Search;
