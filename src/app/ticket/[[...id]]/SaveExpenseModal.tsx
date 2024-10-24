import Button from "@/app/components/Button";
import ModalCard from "@/app/components/ModalCard";
import { useMemo, useState } from "react";

const SaveExpenseModal = ({ handleClose }: { handleClose: () => void }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("saving", name, date, notes);
  };

  const isButtonDisabled = useMemo(() => {
    return !name || !date;
  }, [name, date]);

  return (
    <ModalCard handleClose={handleClose}>
      <div className="flex flex-col">
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
          Save
        </button>
      </div>
    </ModalCard>
  );
};

export default SaveExpenseModal;
