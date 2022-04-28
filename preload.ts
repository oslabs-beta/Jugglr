const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFile: async () => {
    const response = await ipcRenderer.invoke("open");
    return response;
  }
});
