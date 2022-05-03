import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile, uploadTableData,destructureImageList, runNewContainer} from "../utility/fileExplorer";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { setConstantValue } from "typescript";

const Startup = () => {

  const [imageList, setImageList] = useState<string[]>([""])
  const [imageValue, setImageValue] = useState<string>('')
  const [ message, setMessage ] = useState<string>("");
  
  const setFieldType = (field: any) => {
    return (value: string) => {
      form.setFieldValue(field, value);
    };
  };
  const form = useForm({
    initialValues: {
      tablePath: "",
      tableName: "",
      
      
    }
  });
  const form1 = useForm({
    initialValues: {
      imageValue:"",
      containerName:"",
      port:"5432"

    }
  })

  useEffect( () => {
    console.log('start')
    const grabImages = async (): Promise<void> => {
    const response = await dockController.getImagesList()
    const newList:string[] = destructureImageList(response)
    setImageList(newList)
    }
   
    grabImages().catch(console.error);
   
  },[])


  console.log(form1.values)
  
 
  return (
    <>
    <Box>
      <form onSubmit={form1.onSubmit((values)=> runNewContainer(values))}>
    <NativeSelect  required style={{width:"80%"}}  placeholder="select image" label="Image" data={imageList} onChange={(event)=> form1.setFieldValue('imageValue', event.currentTarget.value)} />
    <TextInput
          required
          label="Container Name"
          placeholder="Container Name"
          {...form1.getInputProps("containerName")}  
        />

<TextInput
          required
          label="Port"
          placeholder="Port"
          {...form1.getInputProps("port")}
        />

 
    <Button type="submit">Run New Container</Button>
    </form>
    <form onSubmit={form.onSubmit((values)=> uploadTableData(values))}>
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

         <Button type="submit">Load Table Data</Button>
         </form>

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
