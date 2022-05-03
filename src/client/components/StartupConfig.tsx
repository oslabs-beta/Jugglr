import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import FileSearchButton from "../containers/FileSearchButton";
import { selectFile, uploadTableData,destructureImageList, runNewContainer, destructureContainerList, destructureContainerId, startContainer, stopContainer} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";


const Startup = () => {

  const [imageList, setImageList] = useState<string[]>([""])
  const [containerNames, setContainerList] = useState<string[]>([""]);
  const [containerIdObject,setContainerIdObject] = useState ({})
  
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
  const form2 = useForm({
    initialValues: {
      containerName:"",
      
    }
  })

  useEffect( () => {
    console.log('start')
    const grabImages = async (): Promise<void> => {
    const images = await dockController.getImagesList()
    const containers = await dockController.getContainersList()
    console.log(containers)
    const iList:string[] = destructureImageList(images)
    const cList:string[] = destructureContainerList(containers)
    const cObject = destructureContainerId(containers)
    setContainerIdObject(cObject)
    setContainerList(cList)
    setImageList(iList)
    }
   
    grabImages().catch(console.error);
   
  },[])
  const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    form2.setFieldValue('containerName', event.currentTarget.value)
    // form2.setFieldValue('id', containerIdObject[form2.values.containerName])
  }
  // console.log('containers',containerNames)
  // console.log('id', containerIdObject)
  console.log('form2', form2.values)
  console.log(containerIdObject[form2.values.containerName])

  
 
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
        <form>
        <NativeSelect  required style={{width:"80%"}}  placeholder="select Container" label="container" data={containerNames} onChange={(event)=> setNameAndId(event)} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "30vh"
        }}
      >
        <div style={{ width: "30%" }}>
          <Button fullWidth onClick={()=>{startContainer(containerIdObject[form2.values.containerName])}}>Start</Button>
        </div>

        <div style={{ width: "30%" }}>
          <Button fullWidth onClick={()=>{stopContainer(containerIdObject[form2.values.containerName])}}>Stop</Button>
        </div>

        {/* <div style={{ width: "30%" }}>
          <Button fullWidth variant="outline">
            Remove
          </Button> */}
        {/* </div> */}
      </div>
      </form>
    </Box>
    </>
  );
};

export default Startup;
