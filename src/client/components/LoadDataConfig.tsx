import { Space, Box, Title, Paper, Button, TextInput } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile, uploadTableData} from "../utility/fileExplorer";
import { useForm } from "@mantine/hooks";
import { useAppSelector,useAppDispatch} from "../utility/hooks.types";
import { LoadTable } from "../../types";
import { setEnvConfig } from "../reducers/envConfigSlice";
import { cleanNotifications, showNotification } from "@mantine/notifications";

/**
 * 
 * @returns JSX definition of 'Load Data' tab
 * Load Data tab allows users to upload data to their containeraized database via a csv file. 
 * Users must specify the name of the table they are uploading data to and it must match the table name in schema
 */
const LoadData = () => {
  
  //pull in redux global state and the redux dispatch function to update global state
  const { tablePath, tableName } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();

  

  /**
   * local state of the form declared via Mantine's useForm hook
   */
const form = useForm({
  initialValues: {
    tablePath: tablePath,
    tableName: tableName,
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
  const setStateAndCall = async (values: LoadTable) => {
    dispatch(setEnvConfig(values));
    const response = await uploadTableData(values)
    
    if(response !== ""){
      showNotification({
        message: response,
        autoClose: 4000
      })
    } else {
      await psUploadData.DatabaseResult((args:boolean|string)=>{
        notifyUser(args)
      })
    }
  }
  /**
   * 
   * @param bool 
   * Function will display a success or failure message to the user based on what is received from the backend.
   * True indicates data was loaded successfully, whereas false indicates upload failed 
   */
  const notifyUser = (bool:boolean|string) => {
    if(bool){
      showNotification({
        message: "Data uploaded successfully",
        autoClose: 4000
      })
    } else {
      showNotification({
        message: "Failed to upload data",
        autoClose: 4000
      })
    }
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
