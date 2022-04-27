const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFile: {
    async openFile() {
      console.log('clicked!');
      const response = await ipcRenderer.invoke('open');
      console.log(response);
      return response;
    },
  },
});
