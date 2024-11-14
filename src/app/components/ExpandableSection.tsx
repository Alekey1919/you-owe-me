import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Arrow from "@public/images/back-arrow.svg";
import { useTranslations } from "next-intl";

const ExpandableSection = ({
  text,
  children,
  isOpenByDefault = false,
}: {
  text: string | ReactNode;
  children: ReactNode;
  isOpenByDefault?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const t = useTranslations();

  return (
    <div className="flex flex-col">
      <div
        className="flex space-x-3 cursor-pointer"
        onClick={() => setIsOpen((curr) => !curr)}
      >
        {typeof text === "string" ? <p>{text}</p> : text}
        <Image
          src={Arrow}
          alt={t(`common.${isOpen ? "close" : "open"}`)}
          className={twMerge(
            "w-5 rotate-[-90deg] transition-transform",
            isOpen && " rotate-[90deg]"
          )}
        />
      </div>
      <div className={twMerge("transition-height w-full", isOpen && "open")}>
        {children}
      </div>
    </div>
  );
};

export default ExpandableSection;
