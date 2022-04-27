
const {BrowserWindow, app,dialog, ipcMain} = require('electron');
const path = require('path')
try{
    require('electron-reloader')(module)
} catch(_){console.log('Error')};


 function createWindow(){
     const win = new BrowserWindow({
         width:1200,
         height:800,
         backgroundColor:"yellow",
         resizable: false,
         webPreferences: {
             nodeIntegration:true,
            preload: path.join(__dirname,'preload.js')
         }
     })
     win.loadFile('index.html')
     win.webContents.openDevTools();
     //win.loadURL('localhost://env variable for endpoint')
    //  dialog.showOpenDialog({properties: ['openFile'] }).then(function (response) {
    //     if (!response.canceled) {
    //         // handle fully qualified file name
    //       console.log(response.filePaths[0]);
    //     } else {
    //       console.log("no file selected");
    //     }
    // })
 }


 app.whenReady().then(createWindow)
ipcMain.handle('open', async (_)=>{
    
    const response = await dialog.showOpenDialog({properties: ['openFile'] }).then(function (response) {
            if (!response.canceled) {
                // handle fully qualified file name
              
              let fileName = response.filePaths[0]
              console.log(fileName)
              return fileName;
            } else {
              console.log("no file selected");
                return '';
            }
        })
   return response;
    
})
 app.on( 'window-all-closed', () => {
    if( process.platform !== 'darwin' ) {
        app.quit(); // exit
    }
} );