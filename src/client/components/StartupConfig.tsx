import { Space, Box, Title, Paper, Button, TextInput, NativeSelect, Grid,Center } from "@mantine/core";
import { destructureImageList, runNewContainer, buildImage, } from "../utility/fileExplorer";
import {  useEffect } from "react";
import { useForm, } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownImage } from "../reducers/envConfigSlice";
import { image, StartUpObj } from "../../types";
import { cleanNotifications, showNotification } from "@mantine/notifications";




const Startup = ():JSX.Element => {
  const {  dropDownImage, port} = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
  // const [imageList, setImageList] = useState<string[]>([""])
 
  
  const form1 = useForm({
    initialValues: {
      image:"",
      imageSubmitted: false,
      container:"",
      selectedImage:"",
      port:port,
    }
  })
 

  useEffect( () => {
    console.log('start')
    const grabImages = async (): Promise<void> => {
    const images:image[] = await dockController.getImagesList()
    const iList:string[] = destructureImageList(images)
    // console.log('ilist',iList)
    // form1.setFieldValue('dropDownImage', iList)
    dispatch(setDropDownImage({dropDownImage:iList}))
    form1.setFieldValue('image',"")
    // setImageList(iList)
    
    }
   
    grabImages().catch(console.error);
   
  },[form1.values.imageSubmitted]) 

   
  
  const imageCreated = ():void => {
     if(form1.values.imageSubmitted===false){
        form1.setFieldValue('imageSubmitted',true)
      } else {
        form1.setFieldValue('imageSubmitted',false)
      }
  }

  const notifyUserContainer = (bool:boolean) => {
    console.log(bool)
    if(bool){
      showNotification({
        message:'Container started successfully',
        autoClose: 3500
      })
    } else {
      showNotification({
        message:'Failed to start a new container. Container name may already exist on this port',
        autoClose: 3500
      })
    }
    
  }
  const notifyUserImage = (bool:boolean) => {
    if(bool){
      showNotification({
        message:'Image created successfully',
        autoClose: 3500
      })
    } else {
      console.log('failed')
      showNotification({
        message:'Failed to create new image',
        autoClose: 3500
      })
    }
  }
  
  const setStateAndCall = async (values:StartUpObj, action:string) => {
    if(action==='buildImage'){
      console.log('here')
      buildImage(values.image)
      await dockController.buildImageResult((args:boolean)=>{
       notifyUserImage(args)
      })
      
    } else {
      await runNewContainer(values)
      await dockController.runNewResult((args:boolean)=>{
        console.log('args',args)
      notifyUserContainer(args)
      })
    }
  }


  return (
    <>
    <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Image Configuration
        </Title>
      </Paper>
      <Space h="sm" />
      <Box>

      <form  onSubmit={form1.onSubmit((values)=> setStateAndCall(values,'buildImage'))}>
      
      <Center>

    <TextInput
          style={{marginTop:"5%", width: "60%"}}
          required
          label="Image Name"
          placeholder="Image Name"
          {...form1.getInputProps("image")}  
        />
      </Center>

      <Space h="md" />
      <Center>
      <Button type="submit">Create new Image</Button>
      
      </Center>
      
        </form>
        
    </Box>
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
          Container Configuration
        </Title>
      </Paper>
      <Space h={50} />
    <Box>
    
      <form onSubmit={form1.onSubmit((values)=> setStateAndCall(values,'newContainer'))}>
        <Grid>
     
    <Grid.Col>
    <Center>
      <NativeSelect style={{width:"60%"}} placeholder="select image" label="Image" data={dropDownImage} onClick= {()=>imageCreated()} onChange={(event)=> form1.setFieldValue('selectedImage', event.currentTarget.value)} />
    </Center>
    </Grid.Col>

    <Grid.Col>
      <Center><div style={{display:"flex", justifyContent: "space-between", width:"60%"}}>
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
        </Center>
    </Grid.Col>

    <Grid.Col>
    <Space h="sm" />
      <Center>
    <Button style={{top:"75%"}}type="submit">Run New Container</Button>
    </Center>
    </Grid.Col>
    </Grid>
    </form>
   
         
    </Box>


    </>
  );
};

export default Startup;



