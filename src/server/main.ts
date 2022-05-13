//const fileController = require( "./controllers/fileController");
const { BrowserWindow, app, ipcMain } = require("electron");
const mpath = require("path");
const selectorModule = require('./controllers/fileController');
const { uploadData: psUploadData} = require('./controllers/postgres')
const dockController = require('./controllers/dockerController')


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
  /*
  CREATING AN ELECTRON PACKAGE FOR THE JUGGLR APP:
  To create the electron package, comment out the win.loadFile line above, and uncomment the win.loadFile line below. 
  This will load the index.html file from the electron package folder (where /Resources/app folder exists), instead of the root Jugglr directory as the line above (this is relevant after the package is generated).
  After uncommenting, run "npm run build", and then run "npx electron-packager ." on your terminal. 
  This will generate the jugglr-app electron package in the root directory, based on your machine's OS (e.g., Darwin for Mac) and architecture (e.g., x64 for Darwin).
  You can then move the package anywhere else on your machine and it will work just fine.
  */
  // win.loadFile("../../Resources/app/index.html"); //uncomment this


  //win.loadURL('localhost://env variable for endpoint')
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle("open", async (_event) => {
  try {
    const result = await selectorModule.openFile();
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});

ipcMain.handle("dir", async(_event)=>{
  try {
    const result = await selectorModule.openDir();
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
})

ipcMain.handle("setProjectRoot", async(_event, rootdir)=>{
  try {
    const result = await selectorModule.setProjectRoot(rootdir);
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
})


ipcMain.handle("uploadData", async (_event, table, sqlSchema) => {
  try {
    // console.log('here', table, sqlSchema)
    const result = await psUploadData(table, sqlSchema);
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});


ipcMain.handle("createDockerfile", async (_event, dockerfile) => {
  try {
    return await dockController.createDockerfile(dockerfile);
  }
  catch (err) {
    return err;
  }
});

ipcMain.handle("buildImage", async (event, image) => {
  try {
    // console.log('here');
    const result = await dockController.buildImage(event, image);
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});


ipcMain.handle("runContainer", async (event, imageName, containerName,port) => {
  try {
    await dockController.run(event, imageName, containerName,port)
    return true;
  }
  catch (err) {
    // console.log('catch block', err);
    return err;
  }
 
});

ipcMain.handle("startContainer", async (event, containerId) => {
  try {
    const result = await dockController.startContainer(event, containerId);
    // console.log('startcontainer', result);

    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});

ipcMain.handle("stopContainer", async (event, containerId) => {
  try {
    const result = await dockController.stopContainer(event, containerId);
    // console.log('stopcontainer', result);
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});


ipcMain.handle("removeContainer", async (event, containerId) => {
  try {
    const result = await dockController.removeContainer(event, containerId);
    return result;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});

ipcMain.handle("getContainers", async (_event) => {
  try {
    const result = await dockController.getContainersList();
    const formatted = result.map(object => {
      const id = object.Id;
      const names = object.Names;
      const image = object.Image;
      const imageId = object.ImageID
      return { id, names, image, imageId }
    })
     return formatted;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
});

ipcMain.handle("getImages", async (_event) => {
  try {
   const result = await dockController.getImagesList();
   const formatted = result.map(object => {
    const id = object.Id;
    const containers = object.Containers;
    const repoTags = object.RepoTags;
    return { id: id, containers: containers, repoTags: repoTags}
  })
   return formatted;
  }
  catch (err) {
    // console.log(err);
    return err;
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

