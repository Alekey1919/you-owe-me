import ModalCard from "@/app/components/ModalCard";
import InfoIcon from "@/app/svgs/InfoIcon";
import { ITicket } from "@/app/types/types";
import { parseDateToReadableString } from "@/app/utils/parseDateToString";
import { useState } from "react";

const TicketInfo = ({ name, date, notes }: ITicket) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <InfoIcon
        color="var(--accent)"
        onClick={() => setShowModal(true)}
        className="w-6 h-6 cursor-pointer"
      />
      {showModal && (
        <ModalCard handleClose={() => setShowModal(false)}>
          <div className="w-full flex flex-col space-y-6">
            <span className="title text-center">{name}</span>
            <span>{parseDateToReadableString(date)}</span>
            <span>{notes}</span>
          </div>
        </ModalCard>
      )}
    </>
  );
};

export default TicketInfo;
