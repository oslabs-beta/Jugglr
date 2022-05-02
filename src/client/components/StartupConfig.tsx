import { Space, Box, Title, Paper, Button, TextInput, Select } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { grabImages, selectFile, uploadTableData} from "../utility/fileExplorer";
import { useEffect, useState } from "react";
import { useAppSelector } from "../utility/hooks.types";
import { useForm } from "@mantine/hooks";

const Startup = () => {

  const [imageList, setImageList] = useState<string[]>([''])
  const [ message, setMessage ] = useState<string>("");
  
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

  // useEffect( () => {
  //   const grabImages = async (): Promise<string[]> => {
  //     console.log('grab Docker Images')
  //     const response = await dockController.getImages()
  //       console.log('exiting grabImages')
        
  //   }
  //   setImageList(response)
  // },[])
  
  
  console.log(form.values.tableName,form.values.tablePath)
  console.log(message)
  
  return (
    <>
    <Box>

    <Select  style={{width:"80%"}}  placeholder="select image" label="Image" data={[...imageList]} />
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
