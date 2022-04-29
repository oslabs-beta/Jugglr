const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("selectorModal", {
  openFile: async () => {
    const response = await ipcRenderer.invoke("open");
    return response;
  }
});

contextBridge.exposeInMainWorld("dockerController", {
  createDockerfile: async (...args) => {
    return await ipcRenderer.invoke('createDockerfile', ...args);
  }
})