import { Space, Box, Title, Paper, Button, TextInput } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile,uploadTableData} from "../utility/fileExplorer";
import { useState } from "react";
import { useAppSelector } from "../utility/hooks.types";
import { useForm } from "@mantine/hooks";

const Startup = () => {


  const [ message, setMessage ] = useState("");
  const setFieldType = (field: any) => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  };
  const form = useForm({
    initialValues: {
      tablePath: "",
      tableName: ""
    }
  });

  
  console.log(form.values.tableName,form.values.tablePath)
  console.log(message)
  
  return (
    <>
    <Box>
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

            <Button onClick={async ()=>setMessage(await uploadTableData(form.values.tableName,form.values.tablePath))}>Load Table Data</Button>
        

    </Box>

    <Box sx={{ maxWidth: "100%" }} mx="auto">
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={50}>
          Startup Configuration
        </Title>
      </Paper>
      <Space h={50} />




      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "30vh"
        }}
      >
        <div style={{ width: "30%" }}>
          <Button fullWidth>Start</Button>
        </div>

        <div style={{ width: "30%" }}>
          <Button fullWidth>Stop</Button>
        </div>

        <div style={{ width: "30%" }}>
          <Button fullWidth variant="outline">
            Remove
          </Button>
        </div>
      </div>
    </Box>
    </>
  );
};

export default Startup;
