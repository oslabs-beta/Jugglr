
const {BrowserWindow, app} = require('electron');
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

             contextIsolation:true
         }
     })
     win.loadFile('index.html')
     //win.loadURL('localhost://env variable for endpoint')
 }

 app.whenReady().then(createWindow)

 