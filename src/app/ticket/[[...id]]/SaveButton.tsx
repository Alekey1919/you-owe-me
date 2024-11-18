import Button from "@app/components/Button";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@app/redux/slices/userSlice";
import useCalculationContext from "@app/contexts/calculationContext";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import SaveIcon from "@/app/svgs/SaveIcon";

const SaveButton = ({ openModal }: { openModal: () => void }) => {
  const user = useSelector(selectUser);

  const {
    ticketData: { expenses, participants },
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
      text={
        <div className="flex space-x-2 items-center">
          <span>{t("save")}</span>
          <SaveIcon className="w-4 h-4" />
        </div>
      }
      onClick={onClick}
      disabled={isDisabled}
    />
  );
};

export default SaveButton;
