import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducers from "./root-reducer";

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_MODE !== "production",
});

export default store;
