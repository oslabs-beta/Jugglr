import { ipcMain } from "electron";

const fileController = require('../src/server/controllers/fileController.ts');
const dockerController = require('../src/server/controllers/dockerController')
jest.mock('electron', () => ({
  dialog: {
    showOpenDialog: jest.fn(()=>({filePaths:['This is a file']})),
  },
}));

describe ("Server Routes", () => {
  describe('open', () => {
    // promise resolves. See https://jestjs.io/docs/en/asynchronous
    it('calls the open dialog function', async () => {
      const response = await fileController.openFile();
      console.log(typeof response)
      expect(response).toEqual('This is a file')
    })
  }),
  describe ('getImagesList', () => {
    it ('gets a list of images', async () => {
      const list = await dockerController.getImagesList();
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(list)
      expect(list).toHaveProperty([0])
    })
  })
})