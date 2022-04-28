const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("selectorModal", {
  openFile: async () => {
    const response = await ipcRenderer.invoke("open");
    return response;
  }
});
