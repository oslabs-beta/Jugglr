import { createSlice } from "@reduxjs/toolkit";


export const envConfigSlice = createSlice({
  name: "envConfig",
  initialState: {
    rootDir: "",
    image: "",
    container: "",
    from: "postgres:latest",
    user: "",
    host: "localhost",
    database: "",
    password: "",
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
    },
    setDropDownImage: (state,action) =>{
     
      const {dropDownImage} = action.payload
      return {...state, dropDownImage }
    }
  }
});

export const { setEnvConfig, setDropDownImage } = envConfigSlice.actions;

export default envConfigSlice.reducer;
