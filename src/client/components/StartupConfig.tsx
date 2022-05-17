import { Space, Box, Title, Paper, Button, TextInput, NativeSelect, Grid,Center } from "@mantine/core";
import { destructureImageList, getImages, buildOrRun } from "../utility/dockerFunctions";
import {  useEffect } from "react";
import { useForm, } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownImage } from "../reducers/envConfigSlice";
import { image } from "../../types";
import { showNotification } from "@mantine/notifications";
import React from "react"




const Startup = ():JSX.Element => {
  //destructure redux global state
  const {  dropDownImage, port} = useAppSelector(state => state.envConfig)
  //declare redux dispatch function. Used to update global state
  const dispatch = useAppDispatch();
 
  
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
    const grabImages = async (): Promise<void> => {
    const images:image[] = await getImages()
    const iList:string[] = destructureImageList(images)
    dispatch(setDropDownImage({dropDownImage:iList}))
    form1.setFieldValue('image',"")
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

  const notifyUserContainer = (args:boolean|string) => {
    if(typeof args === 'string'){
      showNotification({
        message: args,
        autoClose: 6000
      })
    } else {
      showNotification({
        message:'Container started successfully',
        autoClose: 3500
      })
    }
    
  }
  const notifyUserImage = (arg:boolean|string) => {
    console.log(typeof arg)
    if(typeof arg==='boolean'){
      showNotification({
        message:'Image created successfully',
        autoClose: 3500
      })
    } else {
      showNotification({
        message:'Failed to create new image',
        autoClose: 3500
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

    <form  onSubmit={form1.onSubmit((values)=> buildOrRun(values,'buildImage',notifyUserImage))}>
      <Center>
        <TextInput
            style={{marginTop:"2%", width: "60%"}}
            required
            label="Image Name"
            placeholder="Image Name"
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
              <NativeSelect style={{width:"60%"}} placeholder="select image" label="Image" data={dropDownImage} onClick= {()=>imageCreated()} onChange={(event)=> form1.setFieldValue('selectedImage', event.currentTarget.value)} />
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
              <Button style={{top:"75%"}}type="submit">Run New Container</Button>
            </Center>
          </Grid.Col>

        </Grid>

    </form>
   </>
  );
};

export default Startup;



