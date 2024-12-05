import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITicket } from "@/app/types/types";

const initialState = null as ITicket | null;

const currentTicketSlice = createSlice({
  name: "currentTicket",
  initialState,
  reducers: {
    addCurrentTicket(state, action: PayloadAction<ITicket | null>) {
      return action.payload;
    },
    removeTicket() {
      return null;
    },
  },
});

export const { addCurrentTicket, removeTicket } = currentTicketSlice.actions;

export const selectCurrentTicket = (state: RootState) => state.currentTicket;

export default currentTicketSlice.reducer;
