import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import localSlice from "./local/localSlice";
import accountSlice from "./account/accountSlice";


const rootReducer = combineReducers({
  local: localSlice,
  user: authSlice,
  profile: accountSlice,
});

export default rootReducer;
