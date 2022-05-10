const { contextBridge, ipcRenderer } = require("electron");
import { container, DockerFile, image } from './types';
const { receiveRunResult } = require('./client/utility/fileExplorer')
// import { Dockerfile } from './types';

contextBridge.exposeInMainWorld("selectorModule", {
  openFile: async () => {
    console.log("hello!")
    const response = await ipcRenderer.invoke("open");
    return response;
  },

  openDir: async ()=> {
    
    const response = await ipcRenderer.invoke("dir");
    return response;
  },

  setProjectRoot: async (rootdir: string)=> {
    return await ipcRenderer.invoke("setProjectRoot", rootdir);
  },

});

contextBridge.exposeInMainWorld("dockController", {
  createDockerfile: async (dockerfile:DockerFile) => {
    return await ipcRenderer.invoke('createDockerfile', dockerfile);
  },
  buildImage: async(imageName:string) => {
    console.log('preload')
    return await ipcRenderer.invoke('buildImage', imageName);
  },
  runContainer: async(imageName: string, containerName:string, port:string) => {
    
      await ipcRenderer.invoke('runContainer', imageName, containerName, port)
      

  }, 
  startContainer: async (containerId:string):Promise<void> => {
    return await ipcRenderer.invoke('startContainer', containerId)
  },
  stopContainer: async (containerId:string):Promise<void> => {
    return await ipcRenderer.invoke('stopContainer', containerId)
  },
  removeContainer: async (containerId:string):Promise<void> => {
    return await ipcRenderer.invoke('removeContainer', containerId)
  },
  getContainersList: async ():Promise<container[]>  => {
    return await ipcRenderer.invoke('getContainers')
  },
  getImagesList: async ():Promise<image[]> => {
    return await ipcRenderer.invoke('getImages')
  },
  // mainToRenderer: async(): Promise<string>=>{
  //   return await ipcRenderer.on('async')
  // }
  
})

contextBridge.exposeInMainWorld("psUploadData", {
  uploadData: async (table:string,sqlSchema:string) => {
    const response = await ipcRenderer.invoke("uploadData", table, sqlSchema);
    return response;
  }
})
ipcRenderer.on('runResult', (event, arg) => {
  console.log('received run result', event, arg)
   receiveRunResult(event, arg);
})