import { Space, Title, Paper, Button, TextInput, NativeSelect, Tooltip } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile } from "../utility/fileExplorer";
import { loadData} from "../utility/postrgresFunctions";
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
    portSelected:"",
    portRefresh:false
    
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
    
  grabPorts().catch(console.error)

  },[form.values.portRefresh]
)

  /**
   * function called in useEffect to grab all active ports
   * will update global state with array of active ports obtained from Docker
   */
const grabPorts = async (): Promise<void> => {
  const containers:container[] = await dockController.getContainersList(false)
  const pArray = destructureContainerPort(containers)
  dispatch(setDropDownPort({activePorts:pArray}))
}


  /**
   * 
   * @param bool 
   * Function will display a success or failure message to the user based on what is received from postgres.
   * True indicates data was loaded successfully, whereas false indicates upload failed 
   */
  const notifyUser = (arg: boolean |string |Error, values:LoadTable) => {
    if(typeof arg==='object' || typeof arg==='string'){
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
      
      /**
       * 
       * @param event 
       * set local state 'portSelected' to the drop down value
       */
  const setSelectedPort = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    form.setFieldValue('portSelected', event.currentTarget.value)
  }

  /**
   * function to update local state 'portRefresh', which will trigger useEffect hook'
   */
  const portRefresh = ()=>{
    if(form.values.portRefresh===true){
      form.setFieldValue('portRefresh',false)
      console.log('false')
    } else {
       form.setFieldValue('portRefresh',true)
       console.log('true')
     }
   }
  return (
    <>
     <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Load Data
        </Title>
      </Paper>

      <Space h={25} />

  
    {/* tablePath and tableName fields are wrapped in a form to leverage Mantine useForm hook */}
      <form  style={{display:'flex', flexDirection:'column', alignItems:"center"}} onSubmit={form.onSubmit((values)=> {loadData(values,notifyUser); })}>
         
         <NativeSelect  required  style={{width:"60%"}} placeholder="Select Port" label="Select A Port" onClick={()=> portRefresh()} data={activePorts} onChange={(event)=> setSelectedPort(event)} />

         <Space h={50}/>
    
          <TextInput
                style={{width:"60%"}}
                required
                label="Table Path"
                placeholder="Table Path"
                {...form.getInputProps("tablePath")}
                rightSection={
                  <Tooltip 
                    label="Table data must be in .csv format"
                    withArrow
                  >
                    <FileSearchButton
                    setField={setFieldType("tablePath")}
                    setPath={selectFile}
                    />
                  </Tooltip>
                }
              />
              
          <Tooltip
          style={{marginTop:"2%",width:"60%"}}
          label="Table name must match schema"
          closeDelay ={200}
          position = "bottom"
          withArrow
          >
            <TextInput
              required
              label="Table Name"
              placeholder="Table Name"
              {...form.getInputProps("tableName")}
            />
          </Tooltip>

          <div style={{display: "flex", justifyContent:"center"}}>
            <div >
                <Button style={{top:"75%"}} onClick={cleanNotifications} type="submit">Load Table Data</Button>
            </div>
          </div>
         
      </form>

    </>
  );
};

export default LoadData;
