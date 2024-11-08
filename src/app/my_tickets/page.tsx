"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ITicket } from "../types/types";
import Link from "next/link";
import Image from "next/image";
import EditImg from "@public/images/edit.svg";
import ClipboardImg from "@public/images/clipboard.svg";
import Spinner from "@public/images/spinner.svg";
import { parseDateToString } from "../utils/parseDateToString";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { getUserTickets } from "../lib/fetchData";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const PAGE_SIZE = 10;

const Page = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

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

  useEffect(() => {
    if (user?.id) {
      fetchData(user.id);
    }
  }, [fetchData, user?.id]);

  return (
    <div className="layout flex flex-col items-center space-y-8">
      <h1 className="title">My tickets</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-4">
        {tickets.map((ticket, index) => {
          return (
            <div
              className="box shadow-lg flex flex-row space-y-2 w-full justify-between"
              key={index}
            >
              <div className="flex flex-col space-y-2">
                <h1 className="subtitle">{ticket.name}</h1>
                <p className="">{parseDateToString(ticket.date)}</p>
              </div>
              <div className="flex flex-col justify-between">
                <Link href={`/ticket/${ticket.id}`}>
                  <Image
                    src={EditImg}
                    alt="Edit"
                    className="w-5 cursor-pointer"
                  />
                </Link>
                <Link href={`/results/${ticket.id}`}>
                  <Image
                    src={ClipboardImg}
                    alt="Results"
                    className="w-5 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
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
  );
};

export default Page;
