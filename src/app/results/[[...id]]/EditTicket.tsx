import { RoutesEnum } from "@/app/enums/routes";
import { selectUser } from "@/app/redux/slices/userSlice";
import EditIcon from "@/app/svgs/EditIcon";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

const EditTicket = ({
  ticketId,
  ticketOwner,
}: {
  ticketId: string;
  ticketOwner: string;
}) => {
  const router = useRouter();
  const params = useParams();

  const user = useSelector(selectUser);

  const isLocal = useMemo(() => {
    return params?.id && params.id[0] === "local";
  }, [params.id]);

  const isEditable = useMemo(() => {
    return isLocal || ticketOwner === user?.id;
  }, [ticketOwner, user?.id, isLocal]);

  const handleRedirect = useCallback(() => {
    if (isLocal) {
      router.push(`${RoutesEnum.Ticket}/local`);
    } else {
      router.push(`${RoutesEnum.Ticket}/${ticketId}`);
    }
  }, [isLocal, router, ticketId]);

  if (!isEditable) {
    return <></>;
  }

  return (
    <EditIcon
      className="w-6 h-6 cursor-pointer"
      color="var(--accent)"
      onClick={handleRedirect}
    />
  );
};

export default EditTicket;
