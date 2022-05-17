const { contextBridge, ipcRenderer } = require("electron");
import { container, DockerFile, image } from './types';

/**
 * preload is an intermediary step between frontend and main function calls.
 * Functions invoked via the front end are forwarded to main via preload
 * responses from main will be returned to the frontend via preload
 * 
 * ipcRenderer.invoke
 * frontend -> preload -> main -> preload -> frontend
 * 
 * ipcRenderer.once
 * listeners set up to listen for events from Docker and postgres that can't be captured via a regular async process 
 * main -> preload -> frontend
 * 
 */

//contextBridge exposes selectorModule, dockController, and psUploadData to frontend without having to write import statements in React
contextBridge.exposeInMainWorld("selectorModule", {
  openFile: async () => {
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
    return await ipcRenderer.invoke('buildImage', imageName);
  },
  runContainer: async(imageName: string, containerName:string, port:string) => {
    return await ipcRenderer.invoke('runContainer', imageName, containerName, port)
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
  getContainersList: async (all:boolean):Promise<container[]>  => {
    return await ipcRenderer.invoke('getContainers',all)
  },
  getImagesList: async ():Promise<image[]> => {
    return await ipcRenderer.invoke('getImages')
  },
  
  runNewResult: (callback:Function) => {
    ipcRenderer.once('runResult', ( _event: Event, arg: boolean|string) => {
      callback(arg)
  })
  },

  buildImageResult: (callback:Function) => {
    ipcRenderer.once('buildImageResult', (_event: Event, arg: boolean|string) => {
    callback(arg)
  })
  },

  startContainerResult: (callback:Function) => {
    ipcRenderer.once('startContainerResult', (_event: Event, arg: boolean|string) => {
      callback(arg)
    })
  },


  stopContainerResult: (callback:Function) => {
    ipcRenderer.once('stopContainerResult', (_event: Event, arg: boolean|string) => {
      callback(arg)
    })
  },

  removeContainerResult:(callback:Function)=>{
    ipcRenderer.once('removeContainerResult', (_event: Event, arg: boolean|string) => {
        callback(arg)
    })
  }
})

contextBridge.exposeInMainWorld("psUploadData", {
  uploadData: async (table:string, sqlSchema:string, port:string) => {
    const response = await ipcRenderer.invoke("uploadData", table, sqlSchema,port);
    return response;
  },

  databaseResult: async (callback:Function) => {
    ipcRenderer.once('databaseResult', (_event: Event, arg: boolean|string) => {
      callback(arg)
    })
  },

   
  
})







