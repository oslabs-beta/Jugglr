import { showNotification } from "@mantine/notifications";
import {  LoadTable} from "../../types";

/**
 * 
 * @param values includes all local state variables - tablePath, tableName, portSelected
 * @param callback callback function that will listen for a response from postgres
 * Upload data to postgres
 * if response is string, we received and error and will display it as notification
 * otherwise, wait for postgres stream to finish uploading data to table and listen for a response.
 */
 export const loadData = async (values: LoadTable,  callback:Function) => {
 
  const response = await uploadTableData(values)

  if(response !== undefined){
    showNotification({
      message: response,
      autoClose: 4000
    })
  } 
  else {
    await psUploadData.databaseResult((args:boolean|string|Error)=>{
      callback(args, values)
    })
  }
  
}

/**
 * 
 * @param values includes all local state variables - tablePath, tableName, portSelected
 * @returns string to capture errors that are sent to frontend without ever reaching postgres
 * 
 * Send tableName, path, and port to backend to load data into running container.
 * Does a validation check to make sure table path ends with .csv extension. 
 * 
 */
export const uploadTableData = async (values:LoadTable) :Promise<string>  => {
  const tablePath= values.tablePath
  const tableName=values.tableName
  const port = values.portSelected
  let ext:string =""
  for(let i=tablePath.length-4;i<tablePath.length;i++){
    ext += tablePath[i]
  }
  if(ext!=='.csv') {
    return 'Please provide a .csv file'
  } 

  const response = await psUploadData.uploadData(tableName,tablePath,port)
  return response;
}






