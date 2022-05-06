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
    },
    setDropDownImage: (state,action) =>{
      //destructure action.payload object which will have a property 'dropDownImage' that 
      //contains the state
      const {dropDownImage} = action.payload
      return {...state, dropDownImage }
    },
    setDropDownContainer: (state,action) => {
      const {containerIdObject, containerNames} = action.payload
      return{...state, containerIdObject,containerNames}
    }

    
  }
});

export const { setEnvConfig, setDropDownImage , setDropDownContainer} = envConfigSlice.actions;

export default envConfigSlice.reducer;
