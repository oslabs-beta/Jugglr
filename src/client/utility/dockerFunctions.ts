import { cleanNotifications } from "@mantine/notifications";
import { container, StartUpObj ,image} from "../../types";


//StartupConfig functions

export const getImages = async () : Promise<image[]> => {
  return await dockController.getImagesList()
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

const buildImage = async (image:string):Promise<void> => {
  console.log('buildImage')
return await dockController.buildImage(image);
}

const runNewContainer = async (values:StartUpObj): Promise<string> => {
  const imageValue = values.selectedImage
  const containerName = values.container
  const port = values.port+'' 
  const response = await dockController.runContainer(imageValue,containerName,port)
  return response
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
  
    const startContainer = async(containerId:string): Promise<boolean| string > => {
 
      if(containerId===undefined){
          return false;
      }
      const response = await dockController.startContainer(containerId)
      return response
      }
      
      const stopContainer = async(containerId:string):Promise<boolean> => {
      if(containerId===undefined){
          return false;
      }
      const response = await dockController.stopContainer(containerId)
      return response
       
      }
      
       const removeContainer = async(containerId: string): Promise<boolean> => {
        if(containerId ===undefined){
          return false;
        }
        const response = await dockController.removeContainer(containerId)
        return response
      }

      export const modifyErrorRemove = (errorMessage: string)=>{
        const arr=errorMessage.split(' ')
        const newArr = arr.slice(0,6)
        return newArr.join(' ')
      }

//LoadDataConfig functions

      export const destructureContainerPort = (container:container[]):string[] => {
        const newArray = ['']
          container.forEach((ele)=>{
            newArray.push(""+ele.port)
          })
        return newArray
        }