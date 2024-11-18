import Link from "next/link";
import { parseDateToString } from "../utils/parseDateToString";
import { ITicket } from "../types/types";
import EditIcon from "../svgs/EditIcon";
import ClipboardIcon from "../svgs/ClipboardIcon";

const Ticket = ({
  ticket,
  handleSelect,
}: {
  ticket: ITicket;
  handleSelect: () => void;
}) => {
  const onClick = (event: any) => {
    // Don't open modal if user clicked on one of the images (edit / results)
    if (!event.target.alt) {
      handleSelect();
    }
  };

  return (
    <div
      className="box shadow-lg flex flex-row space-y-2 w-full justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col space-y-2">
        <h1 className="subtitle">{ticket.name}</h1>
        <p className="">{parseDateToString(ticket.date)}</p>
      </div>
      <div className="flex flex-col justify-between">
        <Link href={`/ticket/${ticket.id}`}>
          <EditIcon className="w-5 h-5 cursor-pointer" />
        </Link>
        <Link href={`/results/${ticket.id}`}>
          <ClipboardIcon className="w-5 h-5 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Ticket;
