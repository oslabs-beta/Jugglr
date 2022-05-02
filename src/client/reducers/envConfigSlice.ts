import { createSlice } from "@reduxjs/toolkit";

export const envConfigSlice = createSlice({
  name: "envConfig",
  initialState: {
    rootDir: "",
    schema: "",
    image: ""
  },
  reducers: {
    setEnvConfig: (state, action) => {
      state[action.type] = action.payload;
    }
  }
});

export const { setEnvConfig } = envConfigSlice.actions;

export default envConfigSlice.reducer;
