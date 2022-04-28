import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});
