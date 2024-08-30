import { combineReducers } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import authSlice from "./features/auth/authSlice";
import accountSlice from "./features/account/accountSlice";

const rootReducer = combineReducers({
  user: authSlice.reducer,
  local: uiSlice.reducer,
  profile: accountSlice.reducer,
});
export default rootReducer;
