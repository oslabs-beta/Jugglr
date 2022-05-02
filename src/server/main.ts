//const fileController = require( "./controllers/fileController");
const { BrowserWindow, app, ipcMain } = require("electron");
const mpath = require("path");
const selectorModule = require('./controllers/fileController');
const { psUploadData } = require('./controllers/postgres')

try {
  require("electron-reloader")(module);
} catch (_) {
  console.log("Error");
}
// import { Dockerfile } from '../types'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: mpath.join(__dirname, "../preload.js")
    }
  });
  win.loadFile("../../index.html");
  //win.loadURL('localhost://env variable for endpoint')
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle("open", async () => {
  try {
    const result = await selectorModule.openFile();
    return result;
  }
  catch (err) {
    console.log(err);
  }
});

ipcMain.handle("uploadData", async (table, sqlSchema) => {
  try {
    const result = await psUploadData(table, sqlSchema);
    return result;
  }
  catch (err) {
    console.log(err);
  }
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

/** testing specific code */
const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');



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