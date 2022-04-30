const { contextBridge, ipcRenderer } = require("electron");
import { Dockerfile } from './types';

contextBridge.exposeInMainWorld("selectorModal", {
  openFile: async () => {
    const response = await ipcRenderer.invoke("open");
    return response;
  }
});

contextBridge.exposeInMainWorld("dockerController", {
  createDockerfile: async (dockerfile: Dockerfile) => {
    return await ipcRenderer.invoke('createDockerfile', dockerfile);
  }
})

contextBridge.exposeInMainWorld("uploadData", {
  uploadData: async (table: string, sqlSchema: string) => {
    const response = await ipcRenderer.invoke("uploadData", table, sqlSchema);
    return response;
  }
})