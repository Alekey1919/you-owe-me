import { useRef, useState } from "react";
import { setUserLocale } from "@app/services/locale";
import { Locale } from "@/i18n/config";
import Image from "next/image";
import LanguagesIcon from "@public/images/language-icon.svg";
import BritishFlag from "@public/images/british-flag.svg";
import SpanishFlag from "@public/images/spanish-flag.svg";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

const Flag = ({
  image,
  isAnimating,
  onClick,
}: {
  image: string;
  isAnimating: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={twMerge(
        "w-5 lg:w-8 shrink-0 cursor-pointer",
        isAnimating && "click-shadow-animation"
      )}
    >
      <Image src={image} alt="English" className="w-full" onClick={onClick} />
    </div>
  );
};

const LanguageSwitcher = () => {
  const [showFlags, setShowFlags] = useState(false);
  const [animatingFlag, setAnimatingFlag] = useState<"es" | "en" | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = useTranslations();

  const changeLanguage = (value: "en" | "es") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const locale = value as Locale;
    setUserLocale(locale);

    setAnimatingFlag(value);

    timeoutRef.current = setTimeout(() => {
      setAnimatingFlag(null);
    }, 750);
  };

  return (
    <div className="relative w-fit">
      <Image
        src={LanguagesIcon}
        alt={t("common.languages")}
        className="w-8 cursor-pointer mix-blend-difference"
        onClick={() => setShowFlags((curr) => !curr)}
      />

      <div
        className={twMerge(
          "transition-all duration-300 ease-out flex lg:flex-col items-center space-x-4 lg:space-x-0 lg:space-y-4 absolute top-0 left-0 right-0 bottom-0 mx-auto opacity-0 pointer-events-none",
          showFlags &&
            "translate-x-10 lg:translate-x-0 lg:translate-y-10 !opacity-100 pointer-events-auto"
        )}
      >
        <Flag
          image={BritishFlag}
          isAnimating={animatingFlag === "en"}
          onClick={() => changeLanguage("en")}
        />
        <Flag
          image={SpanishFlag}
          isAnimating={animatingFlag === "es"}
          onClick={() => changeLanguage("es")}
        />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
