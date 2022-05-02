import {Button, TextInput, Modal,Tooltip, Text, Center} from '@mantine/core'
import { useState } from 'react';
import {AlertCircle} from 'tabler-icons-react'
import { Dockerfile } from '../../types'

const Create = () => {
    
   
    
    const [schemaPath, setSchemaPath] = useState("");
    const [tablePath, setTablePath] = useState("")
    const [rootPath, setRootDirectory] = useState("")
    // const [host,setHost] = useState('localhost')
    // const [user,setUser] = useState('postgres')//env.User
    // const [database, setDatabase] = useState('postgres')//env.database
    // const [password,setPassword] = useState('postgres')//env.password
    // const [port,setPort] = useState(5432) //env.port
  
    const schemaEmpty = schemaPath === "" ? true : false
    const tableEmpty = tablePath === "" ? true : false
    const rootEmpty = rootPath === "" ? true : false
    const dockerFileValues: Dockerfile = {
      from:  'postgres:latest',
      user:  'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
      rootDir: rootPath,
      schema: schemaPath
    }
    console.log(dockerFileValues);

      const selectSchemaFile = async () :Promise<void> => {
          const response = await selectorModule.openFile();
          console.log("Electron's Response:", response);
          setSchemaPath(response);
          console.log("Schema Path:", schemaPath);
          
        };

        const selectProjectRootDirectory = async () :Promise<void>=> {
          const response = await selectorModule.openDir();
          console.log("Electron's Response:", response);
          setRootDirectory(response);
          console.log("Root Path:", rootPath );
          
        };

        const selectTableFile = async () :Promise<void> => {
          const response = await selectorModule.openFile();
          console.log("Electron's Response:", response);
          setTablePath(response);
          console.log("Table Path:", tablePath);
          
        };

        // const selectTablePath = async ():Promise<void> => {

        // }
       
      const rightSection = <Tooltip label="Provide file path to root directory" placement="start" withArrow><AlertCircle size={16}></AlertCircle></Tooltip>
      // const rightSection1 =  <Button  style={{marginTop: "2%", width:"250px"}} radius="md" onClick={selectProjectRootDirectory}>Select Root Directory</Button>

      const uploadTableData = async (table:string, Schema:string) => {
        console.log(table,Schema)
        const response = await psUploadData.uploadData(table,Schema)
      }

      const createDockerFile = async (dockerFileValues: Dockerfile): Promise<void> => {
        console.log(dockerFileValues)
        // const response = await dockerController.createDockerFile()
      }
    return (
      <>
      
      <TextInput
      style={{width:"80%", marginTop: "2%"}}
      label="Project Root Directory"
      variant="filled"
      disabled
      required
      value={rootPath}
      rightSection={rightSection}
    />
    <Button  style={{marginTop: "2%"}} radius="md" onClick={selectProjectRootDirectory}>Select Project Root Directory</Button>
    <Button  style={{marginTop: "2%"}} radius="md" onClick={()=>{createDockerFile(dockerFileValues)}}> Create Docker File </Button>

      <TextInput
       style={{width:"80%"}}
      label="Schema File Name"
      description="Upload Schema File"
      variant="filled"
      disabled
      required
      value={schemaPath}
      error={schemaEmpty}
    />
    <Button  style={{marginTop: "2%"}} disabled={rootEmpty} radius="md" onClick={selectSchemaFile}>Select Schema File </Button>
    <br></br>
    <TextInput
       style={{width:"80%"}}
      label="Table File Name"
      variant="filled"
      disabled
      required
      value={tablePath}
      error={tableEmpty}
    />
    
    
    
    {/* <Button  style={{marginTop: "2%"}} radius="md" onClick={()=>{createDockerFile(dockerFileValues)}}>Create Docker File </Button> */}
   
   

    
    
    
    <Button  style={{marginTop: "2%"}} onClick={selectTableFile} radius="md"> Select Table Data </Button>
    <Button  style={{marginTop: "2%"}} onClick={(()=>uploadTableData(tablePath,schemaPath))} radius="md"> Upload Table Data </Button>
      </>
    );
  };
  
  export default Create;