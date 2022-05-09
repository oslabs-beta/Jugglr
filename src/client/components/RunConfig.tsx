import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import {  destructureContainerList, destructureContainerId, startContainer, stopContainer} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { setEnvConfig, setDropDownContainer } from "../reducers/envConfigSlice";
import { container } from "../../types";
import { showNotification, cleanNotifications } from "@mantine/notifications";



const Run = ():JSX.Element => {
  const { containerIdObject, containerNames } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
  
    const form2 = useForm({
      initialValues: {
        containerSelected:"",
        buttonSelected: false,
      }
    })
  
    useEffect( () => {
      const grabContainer = async (): Promise<void> => {
      const containers:container[] = await dockController.getContainersList()
      console.log('effect',containers)
      const cList:string[] = destructureContainerList(containers)
      const cObject = destructureContainerId(containers)
      dispatch(setDropDownContainer({containerIdObject: cObject, containerNames:cList}))
      // form2.setFieldValue('containerIdObject',cObject)
      // form2.setFieldValue('containerNames', cList)
      }
     
      grabContainer().catch(console.error);
     
    },[form2.values.buttonSelected])
    const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
      form2.setFieldValue('containerSelected', event.currentTarget.value)
      // form2.setFieldValue('id', containerIdObject[form2.values.containerName])
    }
    
  
    const setStateAndCall = async (values: string, action:'start' | 'stop') :Promise<void> => {
      //clear all notifications so only one notification is shown at any given time
      cleanNotifications(); 
      if(action==='start'){
       const response = await startContainer(values)
        if(response){
          const message = `${form2.values.containerSelected} started successfully`
          showNotification({
            message: message,
            autoClose: 4000
          })
        } else {
          const message = containerIdObject[form2.values.containerSelected]===undefined ? `Please select a valid container` : `${form2.values.containerSelected} already started`
          showNotification({
            message: message,
            autoClose: 4000
          })
        } 
      } else {
        const response = await stopContainer(values)
        if(response){
          const message = `${form2.values.containerSelected} stopped successfully`
          showNotification({
            message: message,
            autoClose: 4000
          })
        } else {
          const message = `${form2.values.containerSelected} already stopped`
          showNotification({
            message: message,
            autoClose: 4000
          })
        }
        
      }
      containerRefresh()
      // dispatch(setEnvConfig(form2.values))
    }

    const containerRefresh = ()=>{
      if(form2.values.buttonSelected===true){
        form2.setFieldValue('buttonSelected',false)
        console.log('here')
      } else {
        form2.setFieldValue('buttonSelected',true)
        console.log('nooo')
      }

     }
   console.log( 'state',containerNames)
   console.log( 'state',containerIdObject)
  //  console.log(form2.values.container,'state', container)
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
          }}
        >
          <div style={{ width: "30%" }}>
            <Button fullWidth onClick={()=>{setStateAndCall(containerIdObject[form2.values.containerSelected],'start') }}>Start Container</Button>
          </div>
  
          <div style={{ width: "30%" }}>
            <Button fullWidth onClick={()=>{ setStateAndCall(containerIdObject[form2.values.containerSelected],'stop'); }}>Stop Container</Button>
          </div>
  
          {/* <div style={{ width: "30%" }}>
            <Button fullWidth variant="outline">
              Remove
            </Button> */}
          {/* </div> */}
        </div>
        </div>
        
        </form>
        </div>
      </Box>
      </>
    );
  };
  
  export default Run;
  