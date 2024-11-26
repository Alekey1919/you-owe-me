import { getCookie } from "./cookies";

export enum ColorThemesEnum {
  Light = "light",
  Dark = "dark",
}

export const autoDetectColorPreference = () => {
  if (typeof window === "undefined") return ColorThemesEnum.Dark;

  const savedTheme = getCookie("theme");

  if (savedTheme) return savedTheme as ColorThemesEnum;

  const isDarkSystem =
    window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: dark)`).matches;

  if (isDarkSystem) {
    return ColorThemesEnum.Dark;
  } else {
    return ColorThemesEnum.Light;
  }
};
