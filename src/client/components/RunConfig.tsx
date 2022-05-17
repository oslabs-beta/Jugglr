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
  
  /**
   *   useEffect will grab all containers from Docker on first render and every time dropdown is selected 

   */
  useEffect( () => {
    grabContainer().catch(console.error);
     
  },[form2.values.removeSelected])

  /**
   * function called in useEffect to grab all containers
   * will update global state with list of container names and object with all container ids obtained from Docker
   */
  const grabContainer = async (): Promise<void> => {
    const containers:container[] = await dockController.getContainersList(true)
    const cList:string[] = destructureContainerList(containers)
    const cObject = destructureContainerId(containers)
    dispatch(setDropDownContainer({containerIdObject: cObject, containerNames:cList}))
  }
  
 
  /**
   * 
   * @param event 
   * set local state 'containerSelected' to the drop down value
   */
  const updateSelectedContainer = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
    form2.setFieldValue('containerSelected', event.currentTarget.value)
  }

 
  
  /**
   * 
   * @param args 'args' is the listener response received from the back end
   * Notify users if container successfully started
   * callback function passed into listener - displays a notification that is either an error message (if args is a string) or a success message (if args is a boolean) 
   * 
   */
  const notifyUserStart = async (arg:Boolean |string) => {
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

   /**
   * 
   * @param args 'args' is the listener response received from the back end
   * Notify users if container successfully stopped
   * callback function passed into listener - displays a notification that is either an error message (if args is a string) or a success message (if args is a boolean) 
   * 
   */

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

  /**
   * 
   * @param args 'args' is the listener response received from the back end
   * Notify users if container successfully removed
   * callback function passed into listener - displays a notification that is either an error message (if args is a string) or a success message (if args is a boolean) 
   * 
   */
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
  
 
  /**
   * function to update local state 'removeSelected', which will trigger useEffect hook'
   */
  const containerRefresh = ()=>{
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
  