import { Space, Box, Title, Paper, Button, TextInput, NativeSelect } from "@mantine/core";
import {  destructureContainerList, destructureContainerId, startContainer, stopContainer} from "../utility/fileExplorer";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@mantine/hooks";



const Run = () => {

    const [containerNames, setContainerList] = useState<string[]>([""]);
    const [containerIdObject,setContainerIdObject] = useState ({})
    
    const form2 = useForm({
      initialValues: {
        containerName:"",
      }
    })
  
    useEffect( () => {
      const grabImages = async (): Promise<void> => {
      const containers = await dockController.getContainersList()
      const cList:string[] = destructureContainerList(containers)
      const cObject = destructureContainerId(containers)
      setContainerIdObject(cObject)
      setContainerList(cList)
      }
     
      grabImages().catch(console.error);
     
    },[])
    const setNameAndId = async (event: ChangeEvent<HTMLSelectElement> ):Promise<void> => {
      form2.setFieldValue('containerName', event.currentTarget.value)
      // form2.setFieldValue('id', containerIdObject[form2.values.containerName])
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
          <form style={{position:"absolute",left:"18%", width:"80%"}}>
            
             
          <NativeSelect  required  style={{width:"80%"}} placeholder="select Container" label="Select A Container" data={containerNames} onChange={(event)=> setNameAndId(event)} />
              
        
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
            <Button fullWidth onClick={()=>{startContainer(containerIdObject[form2.values.containerName])}}>Start Container</Button>
          </div>
  
          <div style={{ width: "30%" }}>
            <Button fullWidth onClick={()=>{stopContainer(containerIdObject[form2.values.containerName])}}>Stop Container</Button>
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
  