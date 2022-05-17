import { Space, Box, Title, Paper, Button,  NativeSelect } from "@mantine/core";
import {  destructureContainerList, destructureContainerId, modifyErrorRemove, startStopOrRemove} from "../utility/dockerFunctions";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setDropDownContainer } from "../reducers/envConfigSlice";
import { container } from "../../types";
import { showNotification} from "@mantine/notifications";


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
      removeSelected: false,
    }
  })
  
  
  useEffect( () => {
    //grab all containers list on first render, and every time 'start' or 'stop' buttons are selected
    grabContainer().catch(console.error);
     
  },[form2.values.removeSelected])

  //function called in useEffect to grab all containers
  const grabContainer = async (): Promise<void> => {
    const containers:container[] = await dockController.getContainersList(true)
    const cList:string[] = destructureContainerList(containers)
    const cObject = destructureContainerId(containers)
    dispatch(setDropDownContainer({containerIdObject: cObject, containerNames:cList}))
  }
  
  //function is called when dropdown value changes
  const updateSelectedContainer = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    //set local state 'containerSelected' to the drop down value
    form2.setFieldValue('containerSelected', event.currentTarget.value)
  }

 
  

  const notifyUserStart = async (arg:Boolean |string) => {
    //if true, container started successfully, otherwise container failed to start.
    if(typeof arg==='string'){
      showNotification({
        message: arg,
        autoClose: 3500
      })
    } else {
      showNotification({
        message: `Container '${form2.values.containerSelected}' started successfully`,
        autoClose: 3500
      }) 
    }
      
  }

  const notifyUserStop = async (arg:Boolean |string ) => {
    if(typeof arg==='string'){
      showNotification({
        message: arg,
        autoClose: 3500
      }) 
    } else {
      showNotification({
        message: `Container '${form2.values.containerSelected}' stopped successfully`,
        autoClose: 3500
      })
    }
  }

  const notifyUserRemove = async (arg: Boolean|string) => {
    if(typeof arg==='string'){
      arg = modifyErrorRemove(arg)
      showNotification({
        message: arg,
        autoClose: 3500
      })
     
    } else {
      showNotification({
        message: `Container '${form2.values.containerSelected}' removed successfully`,
        autoClose: 3500
      }) 
    }
  }

  const containerRefresh = ()=>{
    //update local state button selected, to re-run the useEffect hook to bring in new container list. This isn't working...
    if(form2.values.removeSelected===true){
      form2.setFieldValue('removeSelected',false)
      console.log('false')
    } else {
       form2.setFieldValue('removeSelected',true)
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
      <Space h={50}/>
      <div style={{position: "relative",}}>
          <form style={{position:"absolute",left:"18%", width:"80%" }} > 
            {/* set containerNames global state as drop down options. Selected container will be stored in local form state */}
            <NativeSelect  required  style={{width:"80%"}} placeholder="Select Container" onClick={()=>containerRefresh()} label="Select A Container" data={containerNames} onChange={(event)=> updateSelectedContainer(event)} />
            <div style={{position:"relative",}}>
              <div
                  style={{
                    position:"absolute",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "15vh",
                    width:"80%"
                  }}>
                    <div style={{ width: "30%" }}>
                    {/* When button is selected, call setStateAndCall passing in the id of the selected container and the action */}
                      <Button fullWidth onClick={()=>{startStopOrRemove(containerIdObject[form2.values.containerSelected],'start',notifyUserStart) }}>Start</Button>
                    </div>
  
                    <div style={{ width: "30%" }}>
                      <Button fullWidth onClick={()=>{startStopOrRemove(containerIdObject[form2.values.containerSelected],'stop',notifyUserStop); }}>Stop</Button>
                    </div>

                    <div style={{ width: "30%" }}>
                      <Button fullWidth onClick={()=>{startStopOrRemove(containerIdObject[form2.values.containerSelected],'remove',notifyUserRemove); }}>Remove</Button>
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
  