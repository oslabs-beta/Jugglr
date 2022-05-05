const { contextBridge, ipcRenderer } = require("electron");
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
  createDockerfile: async (dockerfile) => {
    return await ipcRenderer.invoke('createDockerfile', dockerfile);
  },
  buildImage: async(imageName) => {
    console.log('preload')
    return await ipcRenderer.invoke('buildImage', imageName);
  },
  runContainer: async(imageName, containerName, port) => {
    return await ipcRenderer.invoke('runContainer', imageName, containerName, port)
  }, 
  startContainer: async (containerId) => {
    return await ipcRenderer.invoke('startContainer', containerId)
  },
  stopContainer: async (containerId) => {
    return await ipcRenderer.invoke('stopContainer', containerId)
  },
  removeContainer: async (containerId) => {
    return await ipcRenderer.invoke('removeContainer', containerId)
  },
  getContainersList: async () => {
    return await ipcRenderer.invoke('getContainers')
  },
  getImagesList: async () => {
    return await ipcRenderer.invoke('getImages')
  }
})

contextBridge.exposeInMainWorld("psUploadData", {
  
  uploadData: async (table,sqlSchema) => {
    console.log('upload preload!')
    console.log(table,sqlSchema)
    const response = await ipcRenderer.invoke("uploadData", table, sqlSchema);
    return response;
  }
})