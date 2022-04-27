
import React, { useState} from 'react';





function App(){
    const [filePath, updatePath] = useState('')
     
    async function handleClick(){
       const response = await electron.openFile.openFile()
       console.log('r',response);
        updatePath(response);
        console.log('f',filePath)
    }
    console.log('ff',filePath);
    
    return(
        <div>
       <h1>
           Testing testing
       </h1>
       <button onClick={ ()=>{  handleClick()}}>
           Upload File
       </button>
       <input type='text' style= {{width:"500px"}} readOnly value = {`${filePath}` }/> 
       </div>
    )
};

export default App;