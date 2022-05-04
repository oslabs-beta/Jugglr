import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import { destructureImageList, runNewContainer, destructureContainerList, destructureContainerId} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";



const Startup = () => {

  const [imageList, setImageList] = useState<string[]>([""])
 
  
  
  
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
    setImageList(iList)
    }
   
    grabImages().catch(console.error);
   
  },[])
  const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    form2.setFieldValue('containerName', event.currentTarget.value)
    // form2.setFieldValue('id', containerIdObject[form2.values.containerName])
  }
  


  
 
  return (
    <>
    <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Docker Config
        </Title>
      </Paper>
      <Space h={50} />
    <Box>
      <div style={{position:"relative"}}>
      <form style={{position:"absolute", left:"26%", width:"60%"}} onSubmit={form1.onSubmit((values)=> runNewContainer(values))}>
    <NativeSelect  required style={{width:"80%"}}  placeholder="select image" label="Image" data={imageList} onChange={(event)=> form1.setFieldValue('imageValue', event.currentTarget.value)} />
    <div style={{width:"80%"}}>
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <TextInput
          style={{marginTop:"5%"}}
          required
          label="Container Name"
          placeholder="Container Name"
          {...form1.getInputProps("containerName")}  
        />

<TextInput
          style={{marginTop:"5%"}}
          required
          label="Port"
          placeholder="Port"
          {...form1.getInputProps("port")}
        />
</div>
</div>

    <div style={{display:"flex", justifyContent:"center", width:"75%"}}>
      <div>
    <Button style={{top:"75%"}}type="submit">Run New Container</Button>
    </div>
    </div>
    </form>
    </div>
         
    </Box>


    </>
  );
};

export default Startup;
