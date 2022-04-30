//const fileController = require( "./controllers/fileController");

const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const selectorModal = require('./controllers/fileController');
const { uploadData } = require('./controllers/postgres')
import { Dockerfile } from '../types'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "yellow",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload.js")
    }
  });
  win.loadFile("../../index.html");
  //win.loadURL('localhost://env variable for endpoint')
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle("open", async () => {
  try {
    const result = await selectorModal.openFile();
    return result;
  }
  catch (err) {
    console.log(err);
  }
});

ipcMain.handle("uploadData", async (table: string, sqlSchema: string) => {
  try {
    const result = await uploadData(table, sqlSchema);
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


try {
  require("electron-reloader")(module);
} catch (_) {
  console.log("Error");
}

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