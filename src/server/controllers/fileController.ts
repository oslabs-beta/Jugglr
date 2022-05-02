
const { dialog } = require('electron');
const fileController = {
  
    openFile: async () => {
      
      const response = await dialog.showOpenDialog({ properties: ["openFile"] })
      if (!response.canceled) {
            const fileName = response.filePaths[0];
            return fileName;
            
      } else {
         console.log("No file selected.");
         return "";
      }
    },

    openDir: async () => {
      
      const response = await dialog.showOpenDialog({ properties: ["openDirectory"] })
      if (!response.canceled) {
      
        console.log(response);
            const fileName = response.filePaths[0];
            return fileName;
            
      } else {
         console.log("No file selected.");
         return "";
      }
    }
  }
module.exports = fileController