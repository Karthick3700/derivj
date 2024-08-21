import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import localSlice from "./local/localSlice";

const rootReducer = combineReducers({
  local: localSlice,
  user: authSlice,
});

export default rootReducer;
