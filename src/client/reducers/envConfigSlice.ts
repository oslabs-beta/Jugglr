import { createSlice } from "@reduxjs/toolkit";


export const envConfigSlice = createSlice({
  name: "envConfig",
  initialState: {
    rootDir: "/Users/anthony/Desktop/Just WOW/VScode_Worktable/Codesmith/OSP/Jugglr",
    image: "",
    container: "",
    from: "postgres:latest",
    user: "",
    host: "localhost",
    database: "",
    password: "",
    port: "5432",
    schema: "/Users/anthony/Desktop/Just WOW/VScode_Worktable/Codesmith/OSP/Jugglr/__tests__/data/species.csv",
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
      //destructure action.payload object which will have a property 'dropDownImage'. 
      //dropDownImage property value represents the new state
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
