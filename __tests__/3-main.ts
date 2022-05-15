
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
  describe ('getImages', () => {
    it ('gets a list of images', async () => {
      const list = await dockerController.getImagesList();
      const formatted = list.map(object => {
        const id = object.Id;
        const containers = object.Containers;
        const repoTags = object.RepoTags;
        return { id: id, containers: containers, repoTags: repoTags}
      })
      expect(formatted).toBeInstanceOf(Array)
    })
  }),
  describe ('getContainers', () => {
    it ('gets a list of containers', async () => {
      const list = await dockerController.getContainersList();
      const formatted = list.map(object => {
        const id = object.Id;
        const names = object.Names;
        const image = object.Image;
        const imageId = object.ImageID
        return { id, names, image, imageId }
      })
      expect(formatted).toBeInstanceOf(Array)
    })
  })
})