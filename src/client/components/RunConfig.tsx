import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import {  destructureContainerList, destructureContainerId, startContainer, stopContainer} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownContainer } from "../reducers/envConfigSlice";
import { container } from "../../types";
import { showNotification, cleanNotifications } from "@mantine/notifications";



const Run = ():JSX.Element => {

  //destructure redux global state
  const { containerIdObject, containerNames } = useAppSelector(state => state.envConfig)
  //declare redux dispatch function. Used to update global state
  const dispatch = useAppDispatch();
  
  //local state for the form
  const form2 = useForm({
    initialValues: {
      containerSelected:"",
      buttonSelected: false,
    }
  })
  
  
  useEffect( () => {
    //grab all containers list on first render, and every time 'start' or 'stop' buttons are selected
    grabContainer().catch(console.error);
     
  },[form2.values.buttonSelected])

  //function called in useEffect to grab all containers
  const grabContainer = async (): Promise<void> => {
    // invoke docker function and receive an array of objects with type 'container'.
    const containers:container[] = await dockController.getContainersList()
    //desctructure returned object to just grab container names
    const cList:string[] = destructureContainerList(containers)
    //destructure returned object to just grab container ids
    const cObject = destructureContainerId(containers)
    //update redux global state
    dispatch(setDropDownContainer({containerIdObject: cObject, containerNames:cList}))
  }
  
  //function is called when dropdown value changes
  const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    //set local state 'containerSelected' to the drop down value
    form2.setFieldValue('containerSelected', event.currentTarget.value)
  }

 
  const setStateAndCall = async (containerId: string, action:'start' | 'stop') :Promise<void> => {
    //clear all notifications so only one notification is shown at any given time
    cleanNotifications(); 
  
    if(action==='start'){
      
      await startContainer(containerId)
    //After invoking start container, listen for response from backend.  Will receive either true or false as a response
      await dockController.startContainerResult((arg:boolean)=>{
        //function below will determine what message is displayed in app 
        notifyUserStart(arg)
      })
    } else {
      await stopContainer(containerId)
      await dockController.stopContainerResult((arg:boolean)=>{
        notifyUserStop(arg)
      })
    }
    containerRefresh()
  }

  const notifyUserStart = async (bool:Boolean) => {
    //if true, container started successfully, otherwise container failed to start.
    if(bool){
      showNotification({
        message: `Container started successfully`,
        autoClose: 3500
      }) 
    } else {
      showNotification({
        message: `Container failed to start. ${form2.values.containerSelected} may already be running`,
        autoClose: 3500
      })
    }
  }

  const notifyUserStop = async (bool:Boolean) => {
    if(bool){
      showNotification({
        message: `container ${form2.values.containerSelected} stopped successfully`,
        autoClose: 3500
      }) 
    } else {
      showNotification({
        message: `Error stopping container - ${form2.values.containerSelected} may already be stopped`,
        autoClose: 3500
      })
    }
  }

  const containerRefresh = ()=>{
    //update local state button selected, to re-run the useEffect hook to bring in new container list. This isn't working...
    if(form2.values.buttonSelected===true){
      form2.setFieldValue('buttonSelected',false)
      console.log('false')
    } else {
       form2.setFieldValue('buttonSelected',true)
       console.log('true')
     }
   }

  return (
    <>
    <Box>
      <Paper style={{ background: "none" }}>
        <Title order={1} align="center" mt={20}>
        Docker Run Configuration
        </Title>
      </Paper>
      <Space h={50} />
      <div style={{position: "relative",}}>
          <form style={{position:"absolute",left:"18%", width:"80%" }} > 
            {/* set containerNames global state as drop down options. Selected container will be stored in local form state */}
            <NativeSelect  required  style={{width:"80%"}} placeholder="Select Container" label="Select A Container" data={containerNames} onChange={(event)=> setNameAndId(event)} />
            <div style={{position:"relative",}}>
              <div
                  style={{
                    position:"absolute",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "15vh",
                    width:"75%"
                  }}>
                    <div style={{ width: "30%" }}>
                    {/* When button is selected, call setStateAndCall passing in the id of the selected container and the action */}
                      <Button fullWidth onClick={()=>{setStateAndCall(containerIdObject[form2.values.containerSelected],'start') }}>Start Container</Button>
                    </div>
  
                    <div style={{ width: "30%" }}>
                      <Button fullWidth onClick={()=>{ setStateAndCall(containerIdObject[form2.values.containerSelected],'stop'); }}>Stop Container</Button>
                    </div>
              </div>
            </div>
          </form>
        </div>
      </Box>
      </>
    );
  };
  
  export default Run;
  