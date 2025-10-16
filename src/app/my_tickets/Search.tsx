import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import { selectTheme } from "../redux/slices/themeSlice";
import { selectUser } from "../redux/slices/userSlice";
import { db } from "../services/firebase/firebase";
import { ITicket } from "../types/types";

const Search = ({
  isOpen,
  setTickets,
  searchActive,
  setSearchActive,
  clearSearch,
  sortOrder,
  setSortOrder,
}: {
  isOpen: boolean;
  setTickets: (tickets: ITicket[]) => void;
  searchActive: boolean;
  setSearchActive: (v: boolean) => void;
  clearSearch: () => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
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
      // Build constraints array
      const constraints = [];

      // Adding filters dynamically
      if (user?.id) {
        constraints.push(where("userId", "==", user.id));
      }
      // We'll filter by name client-side for partial matching
      if (startDate) {
        constraints.push(where("date", ">=", Date.parse(startDate)));

        // Using endDate if specified or today
        const _endDate = endDate ? Date.parse(endDate) : new Date().getTime();

        constraints.push(where("date", "<=", _endDate));
      }

      // Add orderBy at the end
      constraints.push(orderBy("date", sortOrder));

      // If searching by name only (no date range), limit the query to avoid fetching all tickets
      // This improves performance for users with many tickets
      if (ticketName && !startDate) {
        constraints.push(limit(100)); // Fetch last 100 tickets for name-only searches
      }

      // Build the query with all constraints
      const ticketsQuery = query(collection(db, "tickets"), ...constraints);

      const querySnapshot = await getDocs(ticketsQuery);

      let tickets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ITicket[];

      // Filter by ticket name client-side for partial, case-insensitive matching
      if (ticketName) {
        const searchLower = ticketName.toLowerCase().trim();
        tickets = tickets.filter((ticket) =>
          ticket.name.toLowerCase().includes(searchLower)
        );
      }

      setTickets(tickets);
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
    sortOrder,
  ]);

  // Re-run search when sort order changes and search is active
  useEffect(() => {
    if (searchActive) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

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

      <div className="flex w-full justify-between">
        <label htmlFor="sort">{t("sortBy")}:</label>
        <select
          id="sort"
          className="bg-transparent border-0 border-b-[1px] border-b-accent"
          style={{ colorScheme: theme }}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="desc">{t("newest")}</option>
          <option value="asc">{t("oldest")}</option>
        </select>
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
            value={startDate}
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
            value={endDate}
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
