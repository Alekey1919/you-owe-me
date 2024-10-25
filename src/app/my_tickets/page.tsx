"use client";

import { useEffect, useState } from "react";
import { ITicket } from "../types/types";
import Link from "next/link";

const Page = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets");

    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  return (
    <div className="">
      <h1 className="title">My tickets</h1>
      <div className="flex flex-col items-start">
        {tickets.map((ticket, index) => {
          return (
            <Link href={`/ticket/${ticket.id}`} key={index}>
              <div className="box space-y-2">
                <h1 className="subtitle">{ticket.name}</h1>
                <p className="">{ticket.date}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
