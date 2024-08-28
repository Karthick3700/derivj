import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./rootreducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV !== "production") {
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
