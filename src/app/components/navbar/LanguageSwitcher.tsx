import { useRef, useState } from "react";
import { setUserLocale } from "@app/services/locale";
import { Locale } from "@/i18n/config";
import { twMerge } from "tailwind-merge";
import LanguageIcon from "@/app/svgs/LanguageIcon";
import EnglishIcon from "@/app/svgs/EnglishIcon";
import SpanishIcon from "@/app/svgs/SpanishIcon";
import useMediaQueryState from "@/app/hooks/useMediaQueryState";

const LanguageSwitcher = () => {
  const [showFlags, setShowFlags] = useState(false);
  const [animatingFlag, setAnimatingFlag] = useState<"es" | "en" | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isTouch = useMediaQueryState({
    query: "(hover: none), (pointer: coarse)",
  });

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
      <LanguageIcon
        className="w-8 h-8 cursor-pointer"
        onClick={() => setShowFlags((curr) => !curr)}
      />

      <div
        className={twMerge(
          "transition-all duration-300 ease-out flex lg:flex-col items-center space-x-4 lg:space-x-0 lg:space-y-4 absolute top-0 left-0 right-0 bottom-0 mx-auto opacity-0 pointer-events-none",
          showFlags &&
            "translate-x-10 lg:translate-x-0 lg:translate-y-10 !opacity-100 pointer-events-auto"
        )}
      >
        <div
          className={twMerge(
            "w-5 lg:w-8 shrink-0 cursor-pointer",
            animatingFlag === "en" && !isTouch && "click-shadow-animation"
          )}
        >
          <EnglishIcon
            className="w-full"
            onClick={() => changeLanguage("en")}
          />
        </div>

        <div
          className={twMerge(
            "w-5 lg:w-8 shrink-0 cursor-pointer",
            animatingFlag === "es" && !isTouch && "click-shadow-animation"
          )}
        >
          <SpanishIcon
            className="w-full"
            onClick={() => changeLanguage("es")}
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
