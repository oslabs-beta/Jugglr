import { container, DockerFile, EnvConfig, LoadTable, StartUpObj ,image} from "../../types";


/**
 * Action helpers moved here for time being...
 */


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
 * @returns {object}
 */

/**
 * Extracts just the image name from array of image objects obtained from docker
 * @param arr - arr param is an array of image objects
 * @returns returns an array of image names that are shown as the dropdown values
 */
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

/**
 * 
 * @param arr 
 * @returns 
 */
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
    console.log('buildImage')
  return await dockController.buildImage(image);
}
 
export const getImages = async () : Promise<image[]> => {
  return await dockController.getImagesList()
}

export const startContainer = async(containerId:string): Promise<boolean| string > => {
 
if(containerId===undefined){
    return false;
}
const response = await dockController.startContainer(containerId)
return response
}

export const stopContainer = async(containerId:string):Promise<boolean> => {
if(containerId===undefined){
    return false;
}
const response = await dockController.stopContainer(containerId)
return response
 
}

export const removeContainer = async(containerId: string): Promise<boolean> => {
  if(containerId ===undefined){
    return false;
  }
  const response = await dockController.removeContainer(containerId)
  return response
}

export const destructureContainerPort = (container:container[]):string[] => {
const newArray = ['']
  container.forEach((ele)=>{
    newArray.push(""+ele.port)
  })
return newArray
}

export const modifyErrorRemove = (errorMessage: string)=>{
  const arr=errorMessage.split(' ')
  const newArr = arr.slice(0,6)
  return newArr.join(' ')
}

export const buildOrRun = async (values:StartUpObj, action:string, callback:Function) => {
    if(action==='buildImage'){
      buildImage(values.image)
      await dockController.buildImageResult((args:boolean|string|Error)=>{
        //   console.log('dockFunctions',args, typeof args)
       callback(args)
      })
      
    } else {
       runNewContainer(values)
      await dockController.runNewResult((args:boolean|string)=>{
      callback(args)
      })
    }
  }

