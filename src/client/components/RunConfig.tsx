import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import {  destructureContainerList, destructureContainerId, startContainer, stopContainer} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";
import { useAppSelector, useAppDispatch } from "../utility/hooks.types";
import { RunDocker } from "../../types";
import { setEnvConfig } from "../reducers/envConfigSlice";



const Run = () => {
  const { container, containerIdObject, containerNames } = useAppSelector(state => state.envConfig)
  const dispatch = useAppDispatch();
    // const [containerNames, setContainerList] = useState<string[]>([""]);
    // const [containerIdObject,setContainerIdObject] = useState ({})
    
    const form2 = useForm({
      initialValues: {
        container:container,
        containerIdObject:containerIdObject,
        containerNames:containerNames,
      }
    })
  
    useEffect( () => {
      const grabContainer = async (): Promise<void> => {
      const containers = await dockController.getContainersList()
      console.log('effect',containers)
      const cList:string[] = destructureContainerList(containers)
      const cObject = destructureContainerId(containers)
      form2.setFieldValue('containerIdObject',cObject)
      form2.setFieldValue('containerNames', cList)
      }
     
      grabContainer().catch(console.error);
     
    },[container])
    const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
      form2.setFieldValue('container', event.currentTarget.value)
      // form2.setFieldValue('id', containerIdObject[form2.values.containerName])
    }
    // console.log(form2.values)
    
  
    const setStateAndCall = (values: string,action:'start' | 'stop') => {
      if(action==='start'){
        startContainer(values)
      } else {
        stopContainer(values)
      }
      dispatch(setEnvConfig(form2.values));

    }
    
  //  console.log(form2.values.containerNames, 'state', containerNames)
  //  console.log(form2.values.containerIdObject, 'state', containerIdObject)
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
          <form style={{position:"absolute",left:"18%", width:"80%"}}>
            
             
          <NativeSelect  required  style={{width:"80%"}} placeholder="select Container" label="Select A Container" data={form2.values.containerNames} onChange={(event)=> setNameAndId(event)} />
              
        
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
            <Button fullWidth onClick={()=>{setStateAndCall(form2.values.containerIdObject[form2.values.container],'start')}}>Start Container</Button>
          </div>
  
          <div style={{ width: "30%" }}>
            <Button fullWidth onClick={()=>{setStateAndCall(form2.values.containerIdObject[form2.values.container],'stop')}}>Stop Container</Button>
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
  