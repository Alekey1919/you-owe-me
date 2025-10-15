"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "../../i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  // First, check if user has explicitly set a locale via cookie
  const cookieLocale = cookies().get(COOKIE_NAME)?.value;
  if (cookieLocale) {
    return cookieLocale;
  }

  // If no cookie, detect from browser's Accept-Language header
  const acceptLanguage = headers().get("accept-language");
  if (acceptLanguage) {
    // Parse the Accept-Language header (e.g., "es-ES,es;q=0.9,en;q=0.8")
    const browserLocale = acceptLanguage
      .split(",")[0]
      .split("-")[0]
      .toLowerCase();

    // Check if the browser's language is supported
    if (locales.includes(browserLocale as Locale)) {
      return browserLocale;
    }
  }

  // Fall back to default locale
  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
