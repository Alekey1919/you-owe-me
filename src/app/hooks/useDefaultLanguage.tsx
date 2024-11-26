import { useEffect } from "react";
import { getCookie } from "../utils/cookies";
import { locales } from "@/i18n/config";
import { setUserLocale } from "../services/locale";

const useDefaultLanguage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let locale: "es" | "en" = locales[0];

      const cookie = getCookie("NEXT_LOCALE");

      if (cookie) {
        locale = cookie as "en" | "es";
      } else {
        const browserLanguage = navigator.language || navigator.languages[0];

        if (browserLanguage.includes("es")) {
          locale = "es";
        }
      }

      setUserLocale(locale);
    }
  }, []);
};

export default useDefaultLanguage;
