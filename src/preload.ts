const { contextBridge, ipcRenderer } = require("electron");
// import { Dockerfile } from './types';

contextBridge.exposeInMainWorld("selectorModule", {
  openFile: async () => {
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

contextBridge.exposeInMainWorld("uploadData", {
  uploadData: async (table, sqlSchema) => {
    const response = await ipcRenderer.invoke("uploadData", table, sqlSchema);
    return response;
  }
})