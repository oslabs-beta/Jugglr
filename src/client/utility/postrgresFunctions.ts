import {  LoadTable} from "../../types";


/**
 * Action helpers moved here for time being...
 */



export const uploadTableData = async (values:LoadTable, port:string) :Promise<string>  => {
  const tablePath= values.tablePath
  const tableName=values.tableName
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






