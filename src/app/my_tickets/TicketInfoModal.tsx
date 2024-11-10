import { Fragment, useState } from "react";
import ModalCard from "../components/ModalCard";
import { ITicket } from "../types/types";
import { parseDateToString } from "../utils/parseDateToString";
import { RoutesEnum } from "../enums/routes";
import Link from "next/link";
import { deleteTicketById } from "../lib/fetchData";
import toast from "react-hot-toast";
import ExpandableSection from "../components/ExpandableSection";
import TextWithSpinner from "../components/TextWithSpinner";

const TicketInfoModal = ({
  ticket,
  handleClose,
  removeFromList,
}: {
  ticket: ITicket;
  handleClose: () => void;
  removeFromList: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTicket = async () => {
    setIsDeleting(true);

    const result = await deleteTicketById(ticket.id);

    if (result === "Success") {
      toast.success("Ticket removed");
      removeFromList(); // Remove from the state
      handleClose();
    } else {
      toast.error("Error deleting ticket");
    }

    setIsDeleting(false);
  };

  return (
    <ModalCard handleClose={handleClose}>
      <div className="flex flex-col space-y-4">
        <h1 className="title text-center">{ticket.name}</h1>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {parseDateToString(ticket.date)}
        </p>
        {ticket.notes && (
          <p>
            <span className="font-medium">Notes:</span> {ticket.notes}
          </p>
        )}

        <ExpandableSection
          text={
            <p>
              <span className="font-medium">Participants:</span>{" "}
              {ticket.participants.length}
            </p>
          }
        >
          <div className="flex space-x-2 mt-2 flex-wrap">
            {ticket.participants.map((participant, index) => {
              return (
                <Fragment key={index}>
                  <span>{participant}</span>
                  {ticket.participants[index + 1] && <span>|</span>}
                </Fragment>
              );
            })}
          </div>
        </ExpandableSection>

        <ExpandableSection
          text={
            <p>
              <span className="font-medium">Expenses:</span>{" "}
              {ticket.expenses.length}
            </p>
          }
        >
          <div className="flex flex-col space-y-1.5 mt-2">
            {ticket.expenses.map((expense, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <span>
                    {expense.name} - ${expense.price}
                  </span>
                </div>
              );
            })}
          </div>
        </ExpandableSection>
      </div>

      <div className="flex space-x-3">
        <button className="button w-full">
          <Link href={`${RoutesEnum.Ticket}/${ticket.id}`}>Edit</Link>
        </button>
        <button className="button w-full">
          <Link href={`${RoutesEnum.Results}/${ticket.id}`}>Results</Link>
        </button>

        <button className="button w-full relative" onClick={deleteTicket}>
          <TextWithSpinner text="Delete" isLoading={isDeleting} />
        </button>
      </div>
    </ModalCard>
  );
};

export default TicketInfoModal;
