"use client";

import { useEffect, useState } from "react";
import { ITicket } from "../types/types";
import Link from "next/link";
import Image from "next/image";
import EditImg from "@public/images/edit.svg";
import ClipboardImg from "@public/images/clipboard.svg";
import { parseDateToString } from "../utils/parseDateToString";

const Page = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets");

    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  return (
    <div className="layout flex flex-col items-center">
      <h1 className="title">My tickets</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-4 mt-8">
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
    </div>
  );
};

export default Page;
