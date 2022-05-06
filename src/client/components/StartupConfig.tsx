import { Space, Box, Title, Paper, Button, TextInput, NativeSelect, Grid,Center } from "@mantine/core";
import { destructureImageList, runNewContainer, buildImage} from "../utility/fileExplorer";
import {  useEffect } from "react";
import { useForm, } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownImage } from "../reducers/envConfigSlice";



const Startup = () => {
  const {  dropDownImage, port} = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
  // const [imageList, setImageList] = useState<string[]>([""])
 
  
  const form1 = useForm({
    initialValues: {
      image:"",
      imageSubmitted: false,
      
      container:"",
      // containerCreated:false,
      selectedImage:"",
      port:port,

    }
  })
 

  useEffect( () => {
    console.log('start')
    const grabImages = async (): Promise<void> => {
    const images = await dockController.getImagesList()
    console.log('images',images)
    const iList:string[] = destructureImageList(images)
    console.log('ilist',iList)
    // form1.setFieldValue('dropDownImage', iList)
    dispatch(setDropDownImage({dropDownImage:iList}))
    form1.setFieldValue('image',"")
    // setImageList(iList)
    
    }
   
    grabImages().catch(console.error);
   
  },[form1.values.imageSubmitted]) 
  
  const imageCreated = () => {
     if(form1.values.imageSubmitted===false){
        form1.setFieldValue('imageSubmitted',true)
      } else {
        form1.setFieldValue('imageSubmitted',false)
      }
  }
  const setStateAndCall = (values, action:string) => {
    if(action==='buildImage'){
      console.log('build',values);
      
      buildImage(values.image)
      if(form1.values.imageSubmitted===false){
        form1.setFieldValue('imageSubmitted',true)
      } else {
        form1.setFieldValue('imageSubmitted',false)
      }
      
    } else {
      runNewContainer(values)
      // if(form1.values.containerCreated===true){
      //   form1.setFieldValue('containerCreated',false)
      // } else {
      //   form1.setFieldValue('containerCreated',true)

      // }
    }

  
  
}
console.log('outerwstate',dropDownImage)

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
