"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ITicket } from "../types/types";
import Image from "next/image";
import Spinner from "@public/images/spinner.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { getUserTickets } from "../lib/fetchData";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import TicketInfoModal from "./TicketInfoModal";
import Ticket from "./Ticket";

const PAGE_SIZE = 10;

const Page = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  // Keep track of the last doc to handle pagination
  const lastDoc = useRef<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const user = useSelector(selectUser);

  const fetchData = useCallback(async (userId: string) => {
    setIsLoading(true);

    const { tickets: _tickets, lastVisible } = await getUserTickets({
      userId,
      lastDoc: lastDoc.current,
      pageSize: PAGE_SIZE,
    });

    setIsLoading(false);

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
    if (user?.id) {
      fetchData(user.id);
    }
  }, [fetchData, user?.id]);

  return (
    <>
      <div className="layout flex flex-col items-center space-y-8">
        <h1 className="title">My tickets</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-4">
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
          <button
            className="button"
            onClick={() => user?.id && fetchData(user.id)}
          >
            Fetch more
          </button>
        )}
        {isLoading && <Image src={Spinner} className="w-10" alt="Spinner" />}
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
