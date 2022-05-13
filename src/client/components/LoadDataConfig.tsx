import { Space, Box, Title, Paper, Button, TextInput } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile, uploadTableData} from "../utility/fileExplorer";
import { useForm } from "@mantine/hooks";
import { useAppSelector,useAppDispatch} from "../utility/hooks.types";
import { LoadTable } from "../../types";
import { setEnvConfig } from "../reducers/envConfigSlice";
import { cleanNotifications, showNotification } from "@mantine/notifications";


const LoadData = () => {
  const { tablePath, tableName } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();

  const setFieldType = (field:"tablePath") => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  }

  
const form = useForm({
  initialValues: {
    tablePath: tablePath,
    tableName: tableName,
    message:''
    }
  });
  
  const setStateAndCall = async (values: LoadTable) => {
    dispatch(setEnvConfig(values));
    const response = await uploadTableData(values)
    // form.setFieldValue('message',response)
    
  
    showNotification({
      message: response,
      autoClose: 4000
    })
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
