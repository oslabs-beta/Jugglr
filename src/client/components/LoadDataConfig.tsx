import { Space, Box, Title, Paper, Button, TextInput } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile, uploadTableData} from "../utility/fileExplorer";
import { useForm } from "@mantine/hooks";
import { useAppSelector,useAppDispatch} from "../utility/hooks.types";
import { LoadTable } from "../../types";
import { setEnvConfig } from "../reducers/envConfigSlice";


const LoadData = () => {
  const { tablePath, tableName } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
  const setFieldType = (field: any) => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  }

  
  const form = useForm({
    initialValues: {
      tablePath: tablePath,
      tableName: tableName
    }
  });
  
  const setStateAndCall = (values: LoadTable) => {
    dispatch(setEnvConfig(values));
    uploadTableData(values)
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
    <div style={{position:"relative"}}>
    <form style={{position:"absolute", left:"22%",width:"55%"}} onSubmit={form.onSubmit((values)=> setStateAndCall(values))}>
    <TextInput
          required
          disabled
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
          required
          label="Table Name"
          placeholder="Table Name"
          {...form.getInputProps("tableName")}
         
        />
         <div style={{display: "flex", justifyContent:"center"}}>
         <div >
         <Button style={{top:"75%"}} type="submit">Load Table Data</Button>
         </div>
         </div>
         
         </form>
         
         </div>
    </Box>


    </>
  );
};

export default LoadData;
