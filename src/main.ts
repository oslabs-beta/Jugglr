const { BrowserWindow, app, dialog, ipcMain } = require("electron");
// const {
//   default: installExtension,
//   REDUX_DEVTOOLS,
//   REACT_DEVELOPER_TOOLS
// } = require('electron-devtools-installer');
const path = require("path");

try {
  require("electron-reloader")(module);
} catch (_) {
  console.log("Error");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "yellow",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.ts")
    }
  });
  win.loadFile("../index.html");
  //win.loadURL('localhost://env variable for endpoint')
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
// Tester code
// app.whenReady().then(() => {
//   const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
//   const extensionsPlural = extensions.length > 0 ? 's' : '';
//   Promise.all(extensions.map(extension => installExtension(extension)))
//     .then(names =>
//       console.log(`[electron-extensions] Added DevTools Extension${extensionsPlural}: ${names.join(', ')}`))
//     .catch(err =>
//       console.log('[electron-extensions] An error occurred: ', err));
// });

ipcMain.handle("open",async _ => {
   const response = await dialog.showOpenDialog({ properties: ["openFile"] }).then((responseValue) => {
       if (!responseValue.canceled) {
           // handle fully qualified file name
           const fileName = responseValue.filePaths[0];
           return fileName;
       } else {
        console.log("No file selected.");
        return "";
      }
    });
  return response;
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});
