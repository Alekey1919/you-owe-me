import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { setUserLocale } from "@app/services/locale";
import { Locale } from "@/i18n/config";

const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();

  const locales = ["es", "en"];

  const changeLanguage = (value: "en" | "zh") => {
    console.log(value);
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <div>
      {locales.map((locale, index) => (
        <option
          key={index}
          value={locale}
          onClick={() => changeLanguage(locale as "en" | "zh")}
        >
          {locale}
        </option>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
