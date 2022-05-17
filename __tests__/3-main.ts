
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
      expect(response).toEqual('This is a file')
    })
  }),
  describe ('getImages', () => {
    it ('gets a list of images', async () => {
      const list = await dockerController.getImagesList();
      expect(list).toBeInstanceOf(Array)
    })
  }),
  describe ('getContainers', () => {
    it ('gets a list of containers', async () => {
      const list = await dockerController.getContainersList();
      expect(list).toBeInstanceOf(Array)
    })
  })
})