import ModalCard from "@/app/components/ModalCard";
import useCalculationContext from "@/app/contexts/calculationContext";
import { ITicket } from "@/app/types/types";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SaveExpenseModal = ({ handleClose }: { handleClose: () => void }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const { ticketData } = useCalculationContext();

  // If the ticket was already saved we auto-complete with the values
  useEffect(() => {
    if (ticketData.name) setName(ticketData.name);

    // We save the timestamp but the input type date expects a string
    if (ticketData.date) {
      const dateString = new Date(ticketData.date).toISOString().split("T")[0]; // Extracts 'YYYY-MM-DD'

      setDate(dateString);
    }

    if (ticketData.notes) setNotes(ticketData.notes);
  }, [ticketData]);

  const handleSave = () => {
    const isNew = !ticketData.id;

    const ticket = {
      id: isNew ? uuidv4() : ticketData.id,
      name,
      date: Date.parse(date), // We save the timestamp
      notes: notes || null,
      participants: ticketData.participants,
      expenses: ticketData.expenses,
    };

    const savedTickets = localStorage.getItem("tickets");

    let tickets = [];

    if (savedTickets) {
      const savedTicketsParsed = JSON.parse(savedTickets);
      if (isNew) {
        tickets = [...savedTicketsParsed, ticket];
      } else {
        // If we're saved an already created ticket overwrite it
        const existingTicketIndex = JSON.parse(savedTickets)
          .map((ticket: ITicket) => ticket.id)
          .indexOf(ticketData.id);

        savedTicketsParsed[existingTicketIndex] = ticket;

        tickets = savedTicketsParsed;
      }
    } else {
      tickets.push(ticket);
    }

    localStorage.setItem("tickets", JSON.stringify(tickets));

    handleClose();
  };

  const isButtonDisabled = useMemo(() => {
    return !name || !date;
  }, [name, date]);

  return (
    <ModalCard handleClose={handleClose}>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between">
          <label htmlFor="name" className="subtitle">
            Name:
          </label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Summer camp"
            className="bg-transparent text-end text-primary placeholder:text-primary placeholder:opacity-50 focus:outline-none"
          />
        </div>
        <div className="flex w-full justify-between">
          <label htmlFor="date" className="subtitle">
            Date:
          </label>
          <input
            type="date"
            value={date}
            id="date"
            onChange={(e) => setDate(e.target.value)}
            placeholder="23/11/1998"
            className="bg-transparent"
          />
        </div>
        <div className="flex w-full justify-between">
          <label htmlFor="notes" className="subtitle">
            Notes:
          </label>
          <textarea
            value={notes}
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes here"
            className="bg-transparent resize-none text-end focus:outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="button hover:brightness-95"
          disabled={isButtonDisabled}
        >
          {ticketData.id ? "Update" : "Save"}
        </button>
      </div>
    </ModalCard>
  );
};

export default SaveExpenseModal;
