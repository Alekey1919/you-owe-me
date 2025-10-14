"use client";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { getUserTickets } from "../lib/fetchData";
import { selectUser } from "../redux/slices/userSlice";
import SearchIcon from "../svgs/SearchIcon";
import Spinner from "../svgs/Spinner";
import { ITicket } from "../types/types";
import Ticket from "./Ticket";
import TicketInfoModal from "./TicketInfoModal";

import Search from "./Search";

const PAGE_SIZE = 10;

const Page = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [showSearch, setShowSearch] = useState(false);

  const t = useTranslations("myTickets");

  // Keep track of the last doc to handle pagination
  const lastDoc = useRef<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const user = useSelector(selectUser);

  const fetchData = useCallback(
    async (userId: string) => {
      setIsLoading(true);

      const { tickets: _tickets, lastVisible } = await getUserTickets({
        userId,
        lastDoc: lastDoc.current,
        pageSize: PAGE_SIZE,
        sortOrder,
      });

      setIsLoading(false);

      console.log("tickets", _tickets);
      if (_tickets.length) {
        setTickets((curr) => [...curr, ..._tickets]);
        setHasMore(_tickets.length === PAGE_SIZE);
        lastDoc.current = lastVisible;
      }
    },
    [sortOrder]
  );

  const removeFromList = (index: number) => {
    setTickets((curr) => {
      const _curr = [...curr];

      _curr.splice(index, 1);

      return _curr;
    });
  };

  const clearSearch = useCallback(() => {
    setTickets([]);
    lastDoc.current = undefined;
    setSearchActive(false);
  }, []);

  // Handle initial load and sort order changes
  useEffect(() => {
    if (user?.id && !searchActive) {
      // Reset tickets and lastDoc when sort order changes
      setTickets([]);
      lastDoc.current = undefined;

      // Fetch new data with the current sort order
      fetchData(user.id);
    }
  }, [user?.id, searchActive, sortOrder, fetchData]);

  return (
    <>
      <div className="layout flex flex-col space-y-8">
        <div className="relative w-full ">
          <h1 className="title text-center">{t("title")}</h1>
          <SearchIcon
            className="w-[26px] h-[26px] 3xl:w-8 3xl:h-8 cursor-pointer absolute right-0 top-1 lg:right-[unset] lg:left-0"
            onClick={() => setShowSearch((curr) => !curr)}
            fill={searchActive ? "var(--accent)" : "none"}
          />
        </div>

        <Search
          isOpen={showSearch}
          setTickets={setTickets}
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          clearSearch={clearSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 4xl:grid-cols-5 w-full gap-4">
          {tickets.map((ticket, index) => {
            return (
              <Ticket
                ticket={ticket}
                handleSelect={() => setSelectedTicket(index)}
                key={index}
              />
            );
          })}
        </div>
        {hasMore && (
          <Button
            text={t("getMore")}
            onClick={() => user?.id && fetchData(user.id)}
            styles="w-fit mx-auto"
          />
        )}
        {isLoading && (
          <div className="w-full flex justify-center">
            <Spinner className="w-10" />
          </div>
        )}
        {!isLoading && !tickets.length && (
          <span className="text-center">
            {t(searchActive ? "ticketsNotFound" : "youDontHaveAnyTickets")}
          </span>
        )}
      </div>

      {selectedTicket !== null && (
        <TicketInfoModal
          handleClose={() => setSelectedTicket(null)}
          removeFromList={() => removeFromList(selectedTicket)}
          ticket={tickets[selectedTicket]}
        />
      )}
    </>
  );
};

export default Page;
