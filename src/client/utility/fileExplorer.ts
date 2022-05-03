import { DockerFile } from "../../types";

/**
 * Action helpers moved here for time being...
 */
 export const selectFile = async () :Promise<void> => {
  const response = await selectorModule.openFile();
  return response;
};

export const selectProjectRootDirectory = async () :Promise<void>=> {
  const response = await selectorModule.openDir();
  return response;
};

interface table {
  tablePath: string
  tableName: string
}
export const uploadTableData = async (values:table) :Promise<string>  => {
  const tablePath= values.tablePath
  const tableName=values.tableName
  if(tablePath==="" || tableName===""){ 
    return "Please fill out all required fields"
  }
  
  const response = await psUploadData.uploadData(tableName,tablePath)
 console.log(response);
  return response;



}

interface image {
  constainers: number
  repoTags: string[]
  id: string
}

/**
 * Added these to test DockerController
 */
export const setDockerFile = async (values: DockerFile) => {
  const response = await dockController.createDockerfile(values);
  return response;
}

export const destructureImageList = (arr:[]): string[] => {
  
  const newImageList :string[] = ['']
  arr.forEach((ele)=>{
    const curTag: image = ele['repoTags']
    if(curTag!==null){
   
    const string: string = curTag[0].substring(0,curTag[0].lastIndexOf(":"));
    newImageList.push(string);
    
  }
  })
  
  return newImageList
}
interface newContainer {
  imageValue: string
  containerName: string
  port: string
}
export const runNewContainer = async (values:newContainer): Promise<string | string> => {
  const imageValue = values.imageValue
  const containerName = values.containerName
  const port = values.port 
  const response = await dockController.runContainer(imageValue,containerName,port)
  return response
   
}

