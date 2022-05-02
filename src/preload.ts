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
  }

});

contextBridge.exposeInMainWorld("dockerController", {
  createDockerfile: async (dockerfile) => {
    
    return await ipcRenderer.invoke('createDockerfile', dockerfile);
  }
})

contextBridge.exposeInMainWorld("psUploadData", {
  
  uploadData: async (table,sqlSchema) => {
    console.log('upload preload!')
    const response = await ipcRenderer.invoke("uploadData", table, sqlSchema);
    return response;
  }
})