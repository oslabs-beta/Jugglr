import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import { destructureImageList, runNewContainer, destructureContainerList, destructureContainerId} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setEnvConfig } from "../reducers/envConfigSlice";



const Startup = () => {
  const { container, dropDownImage,port,image} = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
  // const [imageList, setImageList] = useState<string[]>([""])
 
  
  
  
  const form1 = useForm({
    initialValues: {
      image:image,
      dropDownImage:dropDownImage,
      container:container,
      port:port
    }
  })
 

  useEffect( () => {
    console.log('start')
    const grabImages = async (): Promise<void> => {
    const images = await dockController.getImagesList()
    const iList:string[] = destructureImageList(images)
    form1.setFieldValue('dropDownImage', iList)

    // setImageList(iList)
    }
   
    grabImages().catch(console.error);
   
  },[]) 
  const setStateAndCall = (values) => {
  dispatch(setEnvConfig(values));
  runNewContainer(values)
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
      <form style={{position:"absolute", left:"26%", width:"60%"}} onSubmit={form1.onSubmit((values)=> setStateAndCall(values))}>
    <NativeSelect  required style={{width:"80%"}}  placeholder="select image" label="Image" data={form1.values.dropDownImage} onChange={(event)=> form1.setFieldValue('image', event.currentTarget.value)} />
    <div style={{width:"80%"}}>
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <TextInput
          style={{marginTop:"5%"}}
          required
          label="Container Name"
          placeholder="Container Name"
          {...form1.getInputProps("container")}  
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
