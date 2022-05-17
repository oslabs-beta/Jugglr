import { cleanNotifications } from "@mantine/notifications";
import { container, StartUpObj ,image} from "../../types";


//StartupConfig functions
/**
 * 
 * @returns returns array of Docker image objects
 */
export const getImages = async () : Promise<image[]> => {
  return await dockController.getImagesList()
}
/**
 * 
 * @param arr array of Docker image objects
 * @returns array of image names
 * 
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
 * @param values local state of startupConfig component
 * @param action type of action - build image or run new container
 * @param callback callback function that will listen for a response from Docker
 */
export const buildOrRun = async (values:StartUpObj, action:string, callback:Function) => {
  if(action==='buildImage'){
    buildImage(values.image)
    await dockController.buildImageResult((args:boolean|string|Error)=>{
     callback(args)
    })
    
  } else {
    runNewContainer(values)
    await dockController.runNewResult((args:boolean|string)=>{
    callback(args)
    })
  }
}

/**
 * 
 * @param image image name
 * @returns void
 */
const buildImage = async (image:string):Promise<void> => {
 await dockController.buildImage(image);
}

/**
 * 
 * @param values local state of startupConfig component
 * send information required to start a new container 
 */
const runNewContainer = async (values:StartUpObj): Promise<void> => {
  const imageValue = values.selectedImage
  const containerName = values.container
  const port = values.port+'' 
  await dockController.runContainer(imageValue,containerName,port)
  
}

  //RunConfig Functions
/**
 * 
 * @param containerId 
 * @param action 
 * @param callback 
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

/**
 * 
 * @param arr 
 * @returns 
 */
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

/**
 * 
 * @param containerId 
 * @param action 
 * @param callback 
 */
export  const startStopOrRemove = async (containerId: string, action:'start' | 'stop'| 'remove', callback:Function) :Promise<void> => {
    //clear all notifications so only one notification is shown at any given time
    cleanNotifications(); 
    console.log(action)
    if(action==='start'){
      await startContainer(containerId)
    //After invoking start container, listen for response from backend.  Will receive either true or false as a response
      await dockController.startContainerResult((arg:boolean | string)=>{
        //function below will determine what message is displayed in app 
        callback(arg)
      })
    } else if (action ==='stop') {
      await stopContainer(containerId)
      await dockController.stopContainerResult((arg:boolean | string)=>{
        callback(arg)
      })
    } else {
      await removeContainer(containerId)
      await dockController.removeContainerResult((arg: boolean|string)=>{
      callback(arg)
      })
      }
  
    }
  
    /**
     * 
     * @param containerId 
     * @returns 
     */
    const startContainer = async(containerId:string): Promise<boolean| string > => {
 
      if(containerId===undefined){
          return false;
      }
      const response = await dockController.startContainer(containerId)
      return response
      }
      
      /**
       * 
       * @param containerId 
       * @returns 
       */
      const stopContainer = async(containerId:string):Promise<boolean> => {
      if(containerId===undefined){
          return false;
      }
      const response = await dockController.stopContainer(containerId)
      return response
       
      }
      /**
       * 
       * @param containerId 
       * @returns 
       */
       const removeContainer = async(containerId: string): Promise<boolean> => {
        if(containerId ===undefined){
          return false;
        }
        const response = await dockController.removeContainer(containerId)
        return response
      }
      /**
       * 
       * @param errorMessage 
       * @returns 
       */
      export const modifyErrorRemove = (errorMessage: string)=>{
        const arr=errorMessage.split(' ')
        const newArr = arr.slice(0,6)
        return newArr.join(' ')
      }

//LoadDataConfig functions
      /**
       * 
       * @param container 
       * @returns 
       */
      export const destructureContainerPort = (container:container[]):string[] => {
        const newArray = ['']
          container.forEach((ele)=>{
            newArray.push(""+ele.port)
          })
        return newArray
        }