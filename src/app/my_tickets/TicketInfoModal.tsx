import { Fragment, useState } from "react";
import ModalCard from "../components/ModalCard";
import { ITicket } from "../types/types";
import { parseDateToString } from "../utils/parseDateToString";
import { RoutesEnum } from "../enums/routes";
import { deleteTicketById } from "../lib/fetchData";
import toast from "react-hot-toast";
import ExpandableSection from "../components/ExpandableSection";
import TextWithSpinner from "../components/TextWithSpinner";
import { useTranslations } from "next-intl";
import BinIcon from "../svgs/BinIcon";
import TwoStatesButton from "../components/TwoStatesButton";
import { useRouter } from "next/navigation";

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const t = useTranslations();
  const router = useRouter();

  const deleteTicket = async () => {
    setIsDeleting(true);

    const result = await deleteTicketById(ticket.id);

    if (result === "Success") {
      toast.success(t("myTickets.ticketRemoved"));
      removeFromList(); // Remove from the state
      handleClose();
    } else {
      setIsDeleting(false);
      toast.error(t("myTickets.errorDeleting"));
    }
  };

  return (
    <ModalCard handleClose={handleClose}>
      <div className="flex flex-col space-y-4 overflow-scroll">
        <h1 className="title text-center px-7">{ticket.name}</h1>
        <p>
          <span className="font-medium">{t("common.date")}:</span>{" "}
          {parseDateToString(ticket.date)}
        </p>
        {ticket.notes && (
          <p>
            <span className="font-medium">{t("common.notes")}</span>{" "}
            {ticket.notes}
          </p>
        )}

        <ExpandableSection
          text={
            <p>
              <span className="font-medium">{t("common.participants")}:</span>{" "}
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
              <span className="font-medium">{t("common.expenses")}:</span>{" "}
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
        <TwoStatesButton
          text1={t("myTickets.edit")}
          text2={
            <TextWithSpinner
              text={t("myTickets.delete")}
              isLoading={isDeleting}
              spinnerColor="var(--background)"
            />
          }
          showSecondText={showDeleteConfirmation}
          onClick={
            showDeleteConfirmation
              ? deleteTicket
              : () => router.push(`${RoutesEnum.Ticket}/${ticket.id}`)
          }
          styles="w-full"
        />
        <TwoStatesButton
          text1={t("myTickets.results")}
          text2={t("myTickets.cancel")}
          showSecondText={showDeleteConfirmation}
          onClick={
            showDeleteConfirmation
              ? () => setShowDeleteConfirmation(false)
              : () => router.push(`${RoutesEnum.Results}/${ticket.id}`)
          }
          styles="w-full"
        />

        <BinIcon
          className="w-6 h-6 absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowDeleteConfirmation(true)}
        />
      </div>
    </ModalCard>
  );
};

export default TicketInfoModal;
