import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import currentTicketReducer from "./slices/currentTicketSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      theme: themeReducer,
      currentTicket: currentTicketReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
