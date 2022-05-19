import { Space, Title, Paper, Button, TextInput, NativeSelect, Grid,Center, Tooltip } from "@mantine/core";
import { destructureImageList, getImages, buildOrRun } from "../utility/dockerFunctions";
import {  useEffect } from "react";
import { useForm, } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownImage } from "../reducers/envConfigSlice";
import { image } from "../../types";
import { showNotification, updateNotification } from "@mantine/notifications";
import { InfoCircle, CircleCheck, FileX} from "tabler-icons-react";
import React from "react"


/**
 * 
 * @returns JSX Definition of Docker Setup tab
 * Startup Config allows users to create a new image from a Dockerfile and start a new container
 */

const Startup = ():JSX.Element => {
  //destructure redux global state
  //declare redux dispatch function. Used to update global state
  const {  dropDownImage, port} = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
 
  //local state via Mantine hook
  const form1 = useForm({
    initialValues: {
      image:"",
      imageSubmitted: false,
      container:"",
      selectedImage:"",
      port:port,
    }
  })
 
/**
 * useEffect hook will grab existing images from Docker, store the image names in an array and update redux state.
 * useEffect Hook will fire on first mount and everytime dropdown is selected
 */
  useEffect( () => {
    const grabImages = async (): Promise<void> => {
    const images:image[] = await getImages()
    const iList:string[] = destructureImageList(images)
    dispatch(setDropDownImage({dropDownImage:iList}))
    }
   
    grabImages().catch(console.error);
   
  },[form1.values.imageSubmitted]) 

   
  
  /**
   * function to update local state 'imageSubmitted', which will trigger useEffect hook'
   */
  const imageRefresh = ():void => {
     if(form1.values.imageSubmitted===false){
        form1.setFieldValue('imageSubmitted',true)
      } else {
        form1.setFieldValue('imageSubmitted',false)
      }
  }

  /**
   * 
   * @param args 'args' is the listener response received from the back end
   * Notify users if container successfully started up
   * callback function passed into listener - displays a notification that is either an error message (if args is a string) or a success message (if args is a boolean) 
   * 
   */
  const notifyUserContainer = (args:boolean|string) => {
    if(typeof args === 'string'){
      updateNotification({
        id: 'run-new-container',
        message:args,
        autoClose: 3500,
        icon: <FileX/>,
      })
    } else {
      updateNotification({
        id: 'run-new-container',
        message:'Container started successfully',
        autoClose: 3500,
        icon: <CircleCheck/>,
      })
    }
  imageRefresh()
  }
    /**
   * 
   * @param args 'args' is the listener response received from the back end
   * Notify users if image was created successfully
   * callback function passed into listener - displays a notification that is either an error message (if args is a string) or a success message (if args is a boolean) 
   * 
   */
  const notifyUserImage = (arg:boolean|string|Error) => {
    if(typeof arg==='boolean'){
      updateNotification({
        id: 'create-image',
        message:'Image created successfully',
        autoClose: 3500,
        icon: <CircleCheck/>,
      })
    } else if (arg === 'string'){
     updateNotification({
        id: 'create-image',
        message:arg,
        autoClose: 3500,
        icon: <FileX/>,
      })
    } else {
      const message = ""+arg
      updateNotification({
        id: 'create-image',
        message: message,
        autoClose: 3500,
        icon: <FileX/>
      })
    }
    imageRefresh()
  }
 
 


  return (
    <>
    <Paper style={{ background: "none" }}>
      <Title order={1} align="center" mt={20}>
          Image Configuration
      </Title>
    </Paper>

    <form  onSubmit={form1.onSubmit((values)=> buildOrRun(values,'buildImage',notifyUserImage))}>
      <Center>
       
        <TextInput
            style={{marginTop:"2%", width: "60%"}}
            required
            label="Image Name"
            placeholder="Image Name"
            rightSection = {
              <Tooltip
              style={{marginTop:"2%",width:"80%"}}
              label="No spaces, special characters, or capitalized letters allowed"
              closeDelay ={200}
              position = "top"
              withArrow
             >
                <InfoCircle
                size={15}
                strokeWidth={2}
                color={'#4079bf'}
                />
             </Tooltip>
        
        }
            {...form1.getInputProps("image")}  
          />
          
          
      </Center>
        <Space h="md" />
      <Center>
        <Button type="submit">Create New Image</Button>
      </Center>
    </form>

    <Space h="xl"/>
    <Space h="xl"/>

    <Paper style={{ background: "none" }}>
       <Title order={1} align="center" mt={20}>
        Container Configuration
       </Title>
    </Paper>

      <Space h="md"/>
    
    <form onSubmit={form1.onSubmit((values)=> buildOrRun(values,'newContainer', notifyUserContainer))}>

        <Grid>

          <Grid.Col>
            <Center>
              {/* onclick calls useEffect in case user creates docker images outside of application while app is opened to this page */}
              <NativeSelect style={{width:"60%"}} placeholder="select image" label="Image" data={dropDownImage} onClick= {()=>imageRefresh()} onChange={(event)=> form1.setFieldValue('selectedImage', event.currentTarget.value)} />
            </Center>
          </Grid.Col>

          <Grid.Col>
            <Center>
              <div style={{display:"flex", justifyContent: "space-between", width:"60%"}}>
                <TextInput
                  style={{width:"55%"}}
                  required
                  label="Container Name"
                  placeholder="Container Name"
                  {...form1.getInputProps("container")}  
                />
    
                <TextInput
                  required
                  label="Port"
                  placeholder="Port"
                  {...form1.getInputProps("port")}
                />

             </div>
            </Center>
          </Grid.Col>

          <Grid.Col>
            <Center>
              <Button style={{top:"75%"}} type="submit">Run New Container</Button>
            </Center>
          </Grid.Col>

        </Grid>

    </form>
   </>
  );
};

export default Startup;



