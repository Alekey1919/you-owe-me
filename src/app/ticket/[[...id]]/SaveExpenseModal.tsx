import { selectTheme } from "@/app/redux/slices/themeSlice";
import ModalCard from "@app/components/ModalCard";
import TextWithSpinner from "@app/components/TextWithSpinner";
import useCalculationContext from "@app/contexts/calculationContext";
import { selectUser } from "@app/redux/slices/userSlice";
import { db } from "@app/services/firebase/firebase";
import { ITicket } from "@app/types/types";
import { parseDateToString } from "@app/utils/parseDateToString";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SaveExpenseModal = ({
  handleClose,
  updateSavedData,
}: {
  handleClose: () => void;
  updateSavedData: (data: ITicket) => void;
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(parseDateToString(Date.now()));
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { ticketData } = useCalculationContext();
  const t = useTranslations("ticket");

  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

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

    const ticketDataToSave = {
      name,
      date: Date.parse(date), // We save the timestamp
      notes,
      participants: ticketData.participants,
      expenses: ticketData.expenses,
      userId: user?.id,
    };

    setIsSaving(true);

    try {
      if (isNew) {
        const docRef = await addDoc(
          collection(db, "tickets"),
          ticketDataToSave as any,
        );
        const savedTicket: ITicket = {
          id: docRef.id,
          ...(ticketDataToSave as ITicket),
        };

        toast.success(t("ticketSavedCorrectly"));
        updateSavedData(savedTicket);
      } else {
        const ticket: ITicket = {
          id: ticketData.id,
          ...(ticketDataToSave as ITicket),
        };
        await setDoc(doc(db, "tickets", ticket.id), ticket);

        toast.success(t("ticketSavedCorrectly"));
        updateSavedData(ticket);
      }

      handleClose();
    } catch (error) {
      console.log("Error saving ticket", error);
      toast.error(t("errorSavingTicket"));
    }
  }, [
    date,
    handleClose,
    name,
    notes,
    t,
    ticketData.expenses,
    ticketData.id,
    ticketData.participants,
    user,
    updateSavedData,
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
            className="bg-transparent text-end text-accent placeholder:text-accent placeholder:opacity-50 focus:outline-none"
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
            style={{
              colorScheme: theme,
            }}
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
          <TextWithSpinner
            text={ticketData.id ? "Update" : "Save"}
            isLoading={isSaving}
          />
        </button>
      </div>
    </ModalCard>
  );
};

export default SaveExpenseModal;
