import { container, DockerFile, EnvConfig, LoadTable, StartUpObj ,image} from "../../types";

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
  return response;



}



/**
 * Call electron to create a DockerFile with given details
 * @param {DockerFile} values
 * @returns {boolean}
 */
export const setDockerFile = async (values: DockerFile): Promise<boolean> => {
  return await dockController.createDockerfile(values);
}

/**
 * call electron to set rootDir env variable
 * @param {EnvConfig} values 
 * @returns {boolean}
 */
export const setProjectDirectory = async (values: EnvConfig): Promise<boolean> => {
  return await selectorModule.setProjectRoot(values.rootDir);
}

export const destructureImageList = (arr:image[]): string[] => {
  const newImageList :string[] = ['']
  arr.forEach((ele)=>{
    const curTag: string[] = ele['repoTags']
    if(curTag!==null){
    const string: string = curTag[0].substring(0,curTag[0].lastIndexOf(":"));
    newImageList.push(string);
  }
  })
  
  return newImageList
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

export const runNewContainer = async (values:StartUpObj): Promise<string> => {
  const imageValue = values.selectedImage
  const containerName = values.container
  const port = values.port+'' 
  
  
  const response = await dockController.runContainer(imageValue,containerName,port)
  return response
   
}
export const buildImage = async (image:string):Promise<void> => {

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

