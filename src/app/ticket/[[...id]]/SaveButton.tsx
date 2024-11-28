import Button from "@app/components/Button";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@app/redux/slices/userSlice";
import useCalculationContext from "@app/contexts/calculationContext";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const SaveButton = ({ openModal }: { openModal: () => void }) => {
  const user = useSelector(selectUser);

  const {
    ticketData: { expenses, participants, id: ticketId },
  } = useCalculationContext();

  const t = useTranslations("ticket");

  const isDisabled = useMemo(() => {
    return !user || !expenses.length || !participants.length;
  }, [expenses.length, participants.length, user]);

  const onClick = useCallback(() => {
    if (!isDisabled) {
      openModal();
    } else {
      if (!user) {
        toast.error(t("signInFirst"));
      } else if (!participants.length) {
        toast.error(t("needParticipants"));
      } else if (!expenses.length) {
        toast.error(t("needExpenses"));
      }
    }
  }, [expenses.length, isDisabled, openModal, participants.length, user, t]);

  return (
    <Button
      text={t(ticketId ? "update" : "save")}
      onClick={onClick}
      disabled={isDisabled}
      styles="text-center"
    />
  );
};

export default SaveButton;
