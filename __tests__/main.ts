const fileController = require('../src/server/controllers/fileController.ts');
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

  })
})