const Docker = require('dockerode');
const path = require('path');
const { buildImage, run } = require('../src/server/controllers/dockerController');
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
  })
      //
      // runImage('test:test');
      // await new Promise(resolve => setTimeout(resolve, 15000));
      // console.log("result", result)
      // await result.on('container', (data) => { return data.remove() })
      // await result.on('end', (data) => {console.log('end', data.release())})
      // expect(result).toBeDefined;
      // expect(result).not.toThrowError;
})
