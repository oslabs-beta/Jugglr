"use strict";
//const fileController = require( "./controllers/fileController");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const selectorModal = require('./controllers/fileController.ts');
const { uploadData } = require('./controllers/postgres');
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "yellow",
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "../preload.ts")
        }
    });
    win.loadFile("../../index.html");
    //win.loadURL('localhost://env variable for endpoint')
    win.webContents.openDevTools();
}
app.whenReady().then(createWindow);
ipcMain.handle("open", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield selectorModal.openFile();
        return result;
    }
    catch (err) {
        console.log(err);
    }
}));
ipcMain.handle("uploadData", (table, sqlSchema) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield uploadData(table, sqlSchema);
        return result;
    }
    catch (err) {
        console.log(err);
    }
}));
app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});
/** testing specific code */
const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
try {
    require("electron-reloader")(module);
}
catch (_) {
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
//# sourceMappingURL=main.js.map