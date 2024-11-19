import { IUser } from "@/app/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = null as IUser | null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser | null>) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
