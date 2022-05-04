import { createSlice } from "@reduxjs/toolkit";

export const envConfigSlice = createSlice({
  name: "envConfig",
  initialState: {
    rootDir: "",
    image: "",
    container: "",
    from: "postgres:latest",
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: "5432",
    schema: "",
    tablePath: "",
    tableName:"",
    dropDownImage:[""],
    containerIdObject:{},
    containerNames:[""]
  },
  reducers: {
    setEnvConfig: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setEnvConfig } = envConfigSlice.actions;

export default envConfigSlice.reducer;
