import { Space, Box, Title, Paper, Button,  NativeSelect } from "@mantine/core";
import {  destructureContainerList, destructureContainerId, startContainer, stopContainer, removeContainer} from "../utility/fileExplorer";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownContainer } from "../reducers/envConfigSlice";
import { container } from "../../types";
import { showNotification, cleanNotifications } from "@mantine/notifications";


/**
 * 
 * @returns JSX Definition for Docker Run tab
 * Docker Run tab enables users to start and stop existing containers in Docker Desktop
 */
const Run = ():JSX.Element => {

  //pull in redux global state and the redux dispatch function to update global state
  const { containerIdObject, containerNames } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
  
  //local state of the form declared via Mantine's useForm hook
  
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

 
  const setStateAndCall = async (containerId: string, action:'start' | 'stop'| 'remove') :Promise<void> => {
    //clear all notifications so only one notification is shown at any given time
    cleanNotifications(); 
    console.log(action)
    if(action==='start'){
      await startContainer(containerId)
    //After invoking start container, listen for response from backend.  Will receive either true or false as a response
      await dockController.startContainerResult((arg:boolean | string)=>{
        //function below will determine what message is displayed in app 
        notifyUserStart(arg)
      })
    } else if (action ==='stop') {
      await stopContainer(containerId)
      await dockController.stopContainerResult((arg:boolean | string)=>{
        notifyUserStop(arg)
      })
    } else {
      console.log('remove react')
      await removeContainer(containerId)
      await dockController.removeContainerResult((arg: boolean|string)=>{
      notifyUserRemove(arg)
      })
      }
      containerRefresh()
    }
  
  

  const notifyUserStart = async (bool:Boolean |string) => {
    //if true, container started successfully, otherwise container failed to start.
    if(bool){
      showNotification({
        message: `Container '${form2.values.containerSelected}' started successfully`,
        autoClose: 3500
      }) 
    } else {
      showNotification({
        message: `Container '${form2.values.containerSelected}' failed to start`,
        autoClose: 3500
      })
    }
  }

  const notifyUserStop = async (bool:Boolean |string ) => {
    if(bool){
      showNotification({
        message: `Container '${form2.values.containerSelected}' stopped successfully`,
        autoClose: 3500
      }) 
    } else {
      showNotification({
        message: `Error stopping container '${form2.values.containerSelected}'`,
        autoClose: 3500
      })
    }
  }

  const notifyUserRemove = async (bool: Boolean|string) => {
    if(bool){
      showNotification({
        message: `Container '${form2.values.containerSelected}' removed successfully`,
        autoClose: 3500
      }) 
    } else {
      showNotification({
        message: `Error removing container '${form2.values.containerSelected}'`,
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

                    <div style={{ width: "30%" }}>
                      <Button fullWidth onClick={()=>{ setStateAndCall(containerIdObject[form2.values.containerSelected],'remove'); }}>Remove Container</Button>
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
  