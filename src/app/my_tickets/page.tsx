"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ITicket } from "../types/types";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { getUserTickets } from "../lib/fetchData";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import TicketInfoModal from "./TicketInfoModal";
import Ticket from "./Ticket";
import { useTranslations } from "next-intl";
import Spinner from "../svgs/Spinner";
import Button from "../components/Button";
import SearchIcon from "../svgs/SearchIcon";

import Search from "./Search";

const PAGE_SIZE = 10;

const Page = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [searchActive, setSearchActive] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const t = useTranslations("myTickets");

  // Keep track of the last doc to handle pagination
  const lastDoc = useRef<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const user = useSelector(selectUser);

  const fetchData = useCallback(async (userId: string) => {
    console.log("fetching");
    setIsLoading(true);

    const { tickets: _tickets, lastVisible } = await getUserTickets({
      userId,
      lastDoc: lastDoc.current,
      pageSize: PAGE_SIZE,
    });

    setIsLoading(false);

    console.log("tickets", _tickets);
    if (_tickets.length) {
      setTickets((curr) => [...curr, ..._tickets]);
      setHasMore(_tickets.length === PAGE_SIZE);
      lastDoc.current = lastVisible;
    }
  }, []);

  const removeFromList = (index: number) => {
    setTickets((curr) => {
      const _curr = [...curr];

      _curr.splice(index, 1);

      return _curr;
    });
  };

  useEffect(() => {
    if (user?.id && !searchActive) {
      fetchData(user.id);
    }
  }, [fetchData, user?.id, searchActive]);

  const clearSearch = useCallback(() => {
    setTickets([]);
    lastDoc.current = undefined;
    setSearchActive(false);
  }, []);

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
