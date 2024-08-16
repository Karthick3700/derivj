import auth from "./authSlice";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
