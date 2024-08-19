const { combineReducers } = require("redux");
import localReducer from "./localstore/localSlice";
import userReducer from "./user/authSlice";

const rootReducers = combineReducers({
  user: userReducer,
  local: localReducer,
});

export default rootReducers;
