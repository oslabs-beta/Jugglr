import { DockerFile, EnvConfig, LoadTable } from "../../types";

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


export const uploadTableData = async (values:LoadTable) :Promise<string>  => {
  const tablePath= values.tablePath
  const tableName=values.tableName
  console.log(tablePath)
  console.log('tn',tableName)
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
 * Call electron to create a DockerFile with given details
 * @param {DockerFile} values
 * @returns {boolean}
 */
export const setDockerFile = async (values: DockerFile) => {
  return await dockController.createDockerfile(values);
}

/**
 * call electron to set rootDir env variable
 * @param {EnvConfig} values 
 * @returns {object}
 */
export const setProjectDirectory = async (values: EnvConfig): Promise<object> => {
  return await selectorModule.setProjectRoot(values.rootDir);
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

interface container {
  id: string
  image: string
  imageId:string
  names: string
}
export const destructureContainerList = (arr:container[]):string[] => {
  
  const newContainerList:string[] = ['']

  arr.forEach((ele)=>{
    const curContainer: string = ele['names'][0]
    const containerName: string = curContainer.substring(curContainer.indexOf("/")+1);
    newContainerList.push(containerName);
    
  }
  )
  
  return newContainerList
}

export const destructureContainerId = (arr:container[]) => {
  
  const containerIdObj = {}

  arr.forEach((ele)=>{
  
    const curContainer: string = ele['names'][0]
    const containerName: string = curContainer.substring(curContainer.indexOf("/")+1);
    const curId: string = ele['id']
    containerIdObj[containerName] = curId
    
  }
  )
  
  return containerIdObj
}
interface newContainer {
  selectedImage: string
  container: string
  port: string
}
export const runNewContainer = async (values:newContainer): Promise<string | string> => {
  const imageValue = values.selectedImage
  const containerName = values.container
  const port = values.port+'' 
  
  
  const response = await dockController.runContainer(imageValue,containerName,port)
  return response
   
}
export const buildImage = async (image:string) => {

  return await dockController.buildImage(image);
}
 

export const startContainer = async(containerId:string): Promise<void> => {
await dockController.startContainer(containerId)
//no response being sent from the backend

}

export const stopContainer = async(containerId:string):Promise<void> => {
await dockController.stopContainer(containerId)
//no response being sent from the backend
 
}

export const receiveRunResult = async (event, args)=> {
  console.log('in receiveRunResult', event, args);
  //act on results = show a message based on what's in args
}