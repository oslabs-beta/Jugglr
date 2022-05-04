const Docker = require('dockerode');
const path = require('path');
const { createDockerfile, buildImage, run, getContainersList , getImagesList} = require('../src/server/controllers/dockerController');
const tfs = require('fs')
jest.setTimeout(20000);
console.log(process.env.ROOTDIR, process.env.POSTGRES_PASSWORD)
const dataDir = path.resolve(`${process.env.ROOTDIR}`, '__tests__/data')

describe ("Dockerfile Create", () => {
  describe('create dockerfile', () => {
    it ('creates a Dockerfile if none exists', async () => {
      const Dockerfile = {
        from: 'postgres:latest' ,
        user: 'postgres' ,
        host: 'localhost' ,
        database: 'postgres' ,
        password: 'postgres' ,
        port:  '5432',
        rootDir: process.env.ROOTDIR,
        schema: path.resolve(process.env.DOCKDIR, 'starwars_postgres.create.sql')
      };
      const result = await createDockerfile(Dockerfile)
      .then(() => {
        const dFile = path.resolve(process.env.DOCKDIR, 'Dockerfile');
        tfs.access(dFile, (err) => {
            console.log(`Dockerfile ${err ? 'does not exist' : 'exists'}`);
        });
      });
      await new Promise(resolve => setTimeout(resolve, 10000));
      expect(result).not.toThrowError;
    })
  }),
  describe('create image', () => {
    it('builds an image from the Dockerfile', async () => {
      const result = await buildImage('new','starwars_postgres_create.sql', dataDir);
      expect(result).toEqual('success');
    })
  }),
  describe ('run image', () => {
    it ('creates an image', async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const docker = await new Docker();
      const container = await run("new:latest", 'testC');
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
      const formatted = list.map(object => {
        const id = object.Id;
        const names = object.Names;
        const image = object.Image;
        const imageId = object.ImageID
        return { id, names, image, imageId }
      })
      expect(formatted).toBeInstanceOf(Array)
    })
  }),
  describe ('getImagesList', () => {
    it ('gets a list of images', async () => {
      const list = await getImagesList()
      const formatted = list.map(object => {
        const id = object.Id;
        const containers = object.Containers;
        const repoTags = object.RepoTags;
        return { id: id, containers: containers, repoTags: repoTags}
      })
      expect(formatted).toBeInstanceOf(Array)
      
    })
  })
})
