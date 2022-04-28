const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fileController", {
  openFile: async () => {
    const response = await ipcRenderer.invoke("open");
    return response;
  }
});
