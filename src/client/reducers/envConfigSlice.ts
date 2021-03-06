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
    containerNames:[""],
    activePorts:[""] 
  },
  reducers: {
    setEnvConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
    setDropDownImage: (state,action) =>{
      //destructure action.payload object which will have a property 'dropDownImage'. 
      //dropDownImage property value represents the new state
      const {dropDownImage} = action.payload
      return {...state, dropDownImage }
    },
    setDropDownContainer: (state,action) => {
      const {containerIdObject, containerNames} = action.payload
      return{...state, containerIdObject,containerNames}
    },
    setDropDownPort: (state ,action)=>{
      const {activePorts} = action.payload
      return{...state, activePorts}
    }
    
  }
});

export const { setEnvConfig, setDropDownImage , setDropDownContainer, setDropDownPort} = envConfigSlice.actions;

export default envConfigSlice.reducer;
