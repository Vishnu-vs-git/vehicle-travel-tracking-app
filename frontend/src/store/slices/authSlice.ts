import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/userTypes";

interface AuthState {
 isAuthenticated : boolean;
 user:User|null
  authChecked: boolean;
}

const initialState: AuthState ={
   isAuthenticated: !!localStorage.getItem("user"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  authChecked: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    loginSuccess(state,action: PayloadAction<User>){
      state.isAuthenticated = true;
      state.user = action.payload;
       state.authChecked = true;
      localStorage.setItem("user", JSON.stringify(action.payload));

    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
       state.authChecked = true;
      localStorage.removeItem("user");
    }
  }
})

export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;