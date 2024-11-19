import { useCallback, useEffect } from "react";
import { ColorThemesEnum } from "../utils/autoDetectColorPreference";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTheme,
  setDarkMode,
  setLightMode,
} from "../redux/slices/themeSlice";
import { setCookie } from "../utils/cookies";

export const ColorPalette = {
  light: "#f2f3f4",
  mutedLight: "#bdc0ba",
  dark: "#0c0c0c",
  mutedDark: "#434343",
};

const useColorTheme = () => {
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const switchColorTheme = useCallback(() => {
    const newTheme =
      theme === ColorThemesEnum.Dark
        ? ColorThemesEnum.Light
        : ColorThemesEnum.Dark;

    dispatch(
      newTheme === ColorThemesEnum.Dark ? setDarkMode() : setLightMode()
    );
  }, [dispatch, theme]);

  const changeColorVariables = useCallback((newTheme: ColorThemesEnum) => {
    const root = document.querySelector(":root") as HTMLElement;

    if (!root) return;

    const accent =
      newTheme === ColorThemesEnum.Dark
        ? ColorPalette.light
        : ColorPalette.dark;
    const mutedAccent =
      newTheme === ColorThemesEnum.Dark
        ? ColorPalette.mutedLight
        : ColorPalette.mutedDark;
    const background =
      newTheme === ColorThemesEnum.Dark
        ? ColorPalette.dark
        : ColorPalette.light;
    const mutedBackground =
      newTheme === ColorThemesEnum.Dark
        ? ColorPalette.mutedDark
        : ColorPalette.mutedLight;

    root?.style.setProperty("--accent", accent);
    root?.style.setProperty("--muted-accent", mutedAccent);
    root?.style.setProperty("--background", background);
    root?.style.setProperty("--muted-background", mutedBackground);

    setCookie("theme", newTheme);
  }, []);

  useEffect(() => {
    changeColorVariables(theme);
  }, [changeColorVariables, theme]);

  return { switchColorTheme, theme };
};

export default useColorTheme;
