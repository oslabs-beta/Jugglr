import { configureStore } from "@reduxjs/toolkit";
import envConfigReducer from "./reducers/envConfigSlice";

export const store = configureStore({
  reducer: {
    envConfig: envConfigReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
