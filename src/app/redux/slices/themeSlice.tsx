import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  autoDetectColorPreference,
  ColorThemesEnum,
} from "@/app/utils/autoDetectColorPreference";

const initialState = autoDetectColorPreference();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode() {
      return ColorThemesEnum.Dark;
    },
    setLightMode() {
      return ColorThemesEnum.Light;
    },
  },
});

export const { setDarkMode, setLightMode } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
