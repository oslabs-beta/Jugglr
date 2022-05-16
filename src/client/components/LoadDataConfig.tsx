import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile } from "../utility/fileExplorer";
import { uploadTableData} from "../utility/postrgresFunctions";
import { destructureContainerPort} from "../utility/dockerFunctions";

import { useForm } from "@mantine/hooks";
import { useAppSelector,useAppDispatch} from "../utility/hooks.types";
import { LoadTable,container} from "../../types";
import   {setEnvConfig,setDropDownPort } from "../reducers/envConfigSlice";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import { ChangeEvent, useEffect } from "react";

/**
 * 
 * @returns JSX definition of 'Load Data' tab
 * Load Data tab allows users to upload data to their containeraized database via a csv file. 
 * Users must specify the name of the table they are uploading data to and it must match the table name in schema
 */
const LoadData = () => {
  
  //pull in redux global state and the redux dispatch function to update global state
  const { tablePath, tableName, activePorts } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();

  

  /**
   * local state of the form declared via Mantine's useForm hook
   */
const form = useForm({
  initialValues: {
    tablePath: tablePath,
    tableName: tableName,
    // activePorts: [""],
    portSelected:""
    
    }
  });
  /**
   *
   * @param field 
   * @returns 
   * Sets the value of the tablePath field
   */
   const setFieldType = (field:"tablePath") => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  }
  /**
   * 
   * @param values 
   * type LoadTable = {
  tablePath: string - absolute path to .csv file with table data
  tableName: string - table name specified via the form. Must match schema.
    }
    Function updates global state via dispatch and invokes uploadTableData to initiate backend process responsible for uploading data to containeraized database.
    Will also notify users if the data was uploaded successfully via psUploadData which listens for a true/false value from the backend.
   */
    
useEffect(() => {
    
  grabPorts()

  },[]
)


const grabPorts = async (): Promise<void> => {
  // invoke docker function and receive an array of objects with type 'container'.
  const containers:container[] = await dockController.getContainersList(false)
  //desctructure returned object to just grab container names
  //destructure returned object to just grab container ids
  const pArray = destructureContainerPort(containers)
  // form.setFieldValue('activePorts',pArray)
  //update redux global state
  dispatch(setDropDownPort({activePorts:pArray}))
}

  const setStateAndCall = async (values: LoadTable) => {
    
    const response = await uploadTableData(values,form.values.portSelected)
    console.log('response', response)
    if(response !== undefined){
      showNotification({
        message: response,
        autoClose: 4000
      })
    } 
    else {
      console.log('here')
      await psUploadData.databaseResult((args:boolean|string|Error)=>{
        console.log('in here', typeof args)
        
        notifyUser(args, values)
      })
    }
    
  }
  /**
   * 
   * @param bool 
   * Function will display a success or failure message to the user based on what is received from the backend.
   * True indicates data was loaded successfully, whereas false indicates upload failed 
   */
  const notifyUser = (arg: boolean |string |Error, values:LoadTable) => {
    
    
    if(typeof arg==='object'){
      const error = ""+arg
    
      showNotification({
        message: error,
        autoClose: 4000
      })
     
    } else {
      showNotification({
        message: "Data uploaded Successfully",
        autoClose: 4000
      })
      
    }
    dispatch(setEnvConfig(values));
  }
      //set local state 'portSelected' to the drop down value
  const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    form.setFieldValue('portSelected', event.currentTarget.value)
  }


  return (
    <>
     <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Load Data
        </Title>
      </Paper>
      <Space h={50} />
    <Box>
    {/* tablePath and tableName fields are wrapped in a form to leverage Mantine useForm hook */}
    <form  style={{display:'flex', flexDirection:'column', alignItems:"center"}} onSubmit={form.onSubmit((values)=> {setStateAndCall(values); })}>
    <NativeSelect  required  style={{width:"60%"}} placeholder="Select Port" label="Select A Port" data={activePorts} onChange={(event)=> setNameAndId(event)} />

    <Space h={50}/>
    
    <TextInput
          style={{width:"60%"}}
          required
          label="Table Path"
          placeholder="Table Path"
          {...form.getInputProps("tablePath")}
          rightSection={
            <FileSearchButton
              setField={setFieldType("tablePath")}
              setPath={selectFile}
            />
          }
        />
        
        <TextInput
        style={{marginTop:"5%",width:"60%"}}
          required
          label="Table Name"
          placeholder="Table Name"
          {...form.getInputProps("tableName")}
          
         
        />
         <div style={{marginTop:"5%",display: "flex", justifyContent:"center"}}>
         <div >
         <Button style={{top:"75%"}} onClick={cleanNotifications} type="submit">Load Table Data</Button>
         </div>
         </div>
         
         </form>

    </Box>


    </>
  );
};

export default LoadData;
