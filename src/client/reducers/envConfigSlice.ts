import { createSlice } from "@reduxjs/toolkit";

export const envConfigSlice = createSlice({
  name: "envConfig",
  initialState: {
    rootDir: "",
    schema: "",
    image: "",
    tablePath: "",
    tableName: ""
  },
  reducers: {
    setEnvConfig: (state, action) => {
      state[action.type] = action.payload;
    }
  }
});


//exporting so all components have access to action creators
export const { setEnvConfig } = envConfigSlice.actions;
//exporting for the store
export default envConfigSlice.reducer;
