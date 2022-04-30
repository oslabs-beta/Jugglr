import {Button, TextInput, Modal,Tooltip, Text, Center} from '@mantine/core'
import { useState } from 'react';
import {AlertCircle} from 'tabler-icons-react'

const Create = () => {
    
   
    
    const [path, setPath] = useState("");
      const handleClick = async () => {
          const response = await selectorModal.openFile();
          console.log("Electron's Response:", response);
          setPath(response);
          console.log("New Path:", path);
          if(response!==""){
          setOpened(true);
          }
        };
       const [opened,setOpened] = useState(false)
      const rightSection = <Tooltip label="Provide file path to root directory" placement="start" withArrow><AlertCircle size={16}></AlertCircle></Tooltip>
      const empty = path === "" ? true : false
      
    return (
      <>
      
      <span><TextInput
       style={{width:"80%"}}
      label="Schema File Name"
      description="Upload Schema File"
      variant="filled"
      disabled
      required
      value={path}
     
      error={empty}
    />
    
    
    <Button  style={{marginTop: "2%"}} radius="md" onClick={handleClick}>Upload file </Button></span>
    <Modal opened={opened} onClose={()=> setOpened(false)} title="Success!">
      {/* <Text><Center>Please upload a valid file</Center></Text> */}
    </Modal>
    <br></br>

    
    <TextInput
      style={{width:"80%", marginTop: "2%"}}
      label="Project Root Directory"
      variant="filled"
      disabled
      required
      rightSection={rightSection}
     
    />
    
    <Button disabled={empty} style={{marginTop: "2%"}} radius="md" onClick={()=>setOpened(true)}> click me </Button>
      </>
    );
  };
  
  export default Create;