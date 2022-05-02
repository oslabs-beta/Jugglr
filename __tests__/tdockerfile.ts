const Docker = require('dockerode');
const path = require('path');
const { buildImage, run, getContainersList , getImagesList} = require('../src/server/controllers/dockerController');
const tfs = require('fs')
jest.setTimeout(20000);
console.log(process.env.ROOTDIR, process.env.PGPASSWORD)
const dataDir = path.resolve(`${process.env.ROOTDIR}`, '__tests__/data')

describe ("Dockerfile Create", () => {
  describe('create image', () => {
    it('builds an image from the Dockerfile', async () => {
      const result = await buildImage('test:test','starwars_postgres_create.sql', dataDir);
      expect(result).toEqual('success');
    })
  }),
  describe ('run image', () => {
    it ('creates an image', async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const docker = await new Docker();
      const container = await run("test:test", 'testcontainer');
      container.on('container', async function (container) {
        const containerId = await docker.getContainer(container.id);
        console.log(containerId.id);
        expect(containerId.id).toBeDefined;
        expect(containerId).not.toThrowError
      })
      await new Promise(resolve => setTimeout(resolve, 10000));
      const id = tfs.readFileSync(`${process.env.DOCKDIR}/container.txt`, "utf8")
      console.log(id)
      expect(id).toBeDefined;
    })
  }),
  describe ('getContainersList', () => {
    it ('gets a list of containers', async () => {
      const list = await getContainersList();
      await new Promise(resolve => setTimeout(resolve, 2000));
      expect(list).toHaveProperty([0])
    })
  }),
  describe ('getImagesList', () => {
    it ('gets a list of images', async () => {
      const list = await getImagesList();
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(list)
      expect(list).toHaveProperty([0])
    })
  })
})
