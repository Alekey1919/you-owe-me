import ModalCard from "@/app/components/ModalCard";
import useCalculationContext from "@/app/contexts/calculationContext";
import { selectUser } from "@/app/redux/slices/userSlice";
import { db } from "@/app/services/firebase/firebase";
import { ITicket } from "@/app/types/types";
import { parseDateToString } from "@/app/utils/parseDateToString";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Spinner from "@public/images/spinner.svg";
import { twMerge } from "tailwind-merge";

const SaveExpenseModal = ({ handleClose }: { handleClose: () => void }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(parseDateToString(Date.now()));
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { ticketData } = useCalculationContext();

  const user = useSelector(selectUser);

  // If the ticket was already saved we auto-complete with the values
  useEffect(() => {
    if (ticketData.name) setName(ticketData.name);

    // We save the timestamp but the input type date expects a string
    if (ticketData.date) {
      setDate(parseDateToString(ticketData.date));
    }

    if (ticketData.notes) setNotes(ticketData.notes);
  }, [ticketData]);

  const handleSave = useCallback(async () => {
    if (!user) return;

    const isNew = !ticketData.id;

    const ticket: ITicket = {
      id: isNew ? uuidv4() : ticketData.id,
      name,
      date: Date.parse(date), // We save the timestamp
      notes,
      participants: ticketData.participants,
      expenses: ticketData.expenses,
      userId: user?.id,
    };

    setIsSaving(true);

    await setDoc(doc(db, "tickets", ticket.id), ticket);

    handleClose();
  }, [
    date,
    handleClose,
    name,
    notes,
    ticketData.expenses,
    ticketData.id,
    ticketData.participants,
    user,
  ]);

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
          className="button hover:brightness-95 relative"
          disabled={isButtonDisabled}
        >
          <span
            className={twMerge(
              "transition-opacity duration-300",
              isSaving && "opacity-0"
            )}
          >
            {ticketData.id ? "Update" : "Save"}
          </span>

          <Image
            src={Spinner}
            alt="Spinner"
            className={twMerge(
              "w-8 absolute left-0 right-0 bottom-0 top-0 m-auto mix-blend-difference opacity-0 transition-opacity duration-300",
              isSaving && "opacity-100"
            )}
          />
        </button>
      </div>
    </ModalCard>
  );
};

export default SaveExpenseModal;
