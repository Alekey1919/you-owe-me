"use client";

import { useEffect, useState } from "react";
import { ITicket } from "../types/types";

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
      <div className="flex flex-col">
        {tickets.map((ticket, index) => {
          return (
            <div className="" key={index}>
              {ticket.participants}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
