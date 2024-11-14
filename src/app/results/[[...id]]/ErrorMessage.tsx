import { ResultErrorsEnum } from "@app/hooks/useSplitTicket";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

const ErrorMessage = ({ error }: { error: ResultErrorsEnum }) => {
  const t = useTranslations("results");

  const text = useMemo(() => {
    if (error === ResultErrorsEnum.TicketNotFound) {
      return t("ticketNotFound");
    }
  }, [error, t]);

  return (
    <div className="absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center">
      <span className="subtitle">{text}</span>
    </div>
  );
};

export default ErrorMessage;
