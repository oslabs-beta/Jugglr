import {Button, TextInput, Modal,Text, Center} from '@mantine/core'
import { useState } from 'react';

const Create = () => {
    
   
    
    const [path, setPath] = useState("");
      const handleClick = async () => {
          const response = await selectorModal.openFile();
          console.log("Electron's Response:", response);
          setPath(response);
          console.log("New Path:", path);
        };
       const [opened,setOpened] = useState(false)
    return (
      <>
        <TextInput
      
      label="Schema File Name"
      description="Upload Schema File"
      variant="filled"
      disabled
      required
      value={path}
     
      error="Please upload a valid file"
    /><Button  onClick={handleClick}>Upload file </Button>
    <Modal opened={opened} onClose={()=> setOpened(false)} title="Please upload a valid file">
      {/* <Text><Center>Please upload a valid file</Center></Text> */}
    </Modal>
    <Button onClick={()=>setOpened(true)}> click me </Button>
      </>
    );
  };
  
  export default Create;