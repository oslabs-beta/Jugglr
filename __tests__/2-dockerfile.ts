const { ipcMain, ipcRenderer } = require('./electron-mock')
const Docker = require('dockerode');
const path = require('path');
const { createDockerfile, buildImage, run, getContainersList , getImagesList} = require('../src/server/controllers/dockerController');
const fs = require('fs')
jest.setTimeout(20000);
process.env.SCHEMA = path.resolve(`${process.env.ROOTDIR}`, 'data/starwars_postgres_create.sql')
describe('Docker tests', () => {
  describe ("Dockerfile Create", () => {
    it ('creates a Dockerfile if none exists', async () => {
      const Dockerfile = {
        from: 'postgres:latest' ,
        user: 'postgres' ,
        host: 'localhost' ,
        database: 'postgres' ,
        password: 'postgres' ,
        port:  '5432',
        rootDir: process.env.ROOTDIR,
        schema: process.env.SCHEMA
      };
      const dFile = path.resolve(process.env.DOCKDIR, 'Dockerfile');
      fs.access(dFile, (err) => { if (!err) fs.unlinkSync(dFile, (err) => {
        if (err) console.log('error deleting Dockerfile')
        }) 
      })
      const result = await createDockerfile(Dockerfile);
      expect(fs.existsSync(dFile)).not.toThrowError;
    })
  }),
  describe("Create Image", () => {
      it('returns false if build fails', async () => {
        const event = ipcRenderer._event;
        buildImage(event, 'Mistake');
        let result;
        await ipcMain.on('buildImageResult', (_event: Event, arg: boolean|string) => {
          result = arg;
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(result).toThrowError
      }), 
      it('builds an image from the Dockerfile', async () => {
        const event = ipcRenderer._event;
        buildImage(event, 'test');
        let result;
        await ipcMain.on('buildImageResult', (_event: Event, arg: boolean|string) => {
          result = arg;
        })
        await new Promise(resolve => setTimeout(resolve, 2000));
        expect(result).toBe(true);
        }),
      it ('overwrites a Dockerfile if one exists', async () => {
        const Dockerfile = {
          from: 'postgres:latest' ,
          user: 'newperson' ,
          host: 'localhost' ,
          database: 'postgres' ,
          password: 'postgres' ,
          port:  '5432',
          rootDir: process.env.ROOTDIR,
          schema: process.env.SCHEMA
        };
        const dFile = path.resolve(process.env.DOCKDIR, 'Dockerfile');
        const result = await createDockerfile(Dockerfile);
        const file = fs.readFileSync(dFile, { encoding: 'utf8'} );
        expect(file).toContain('newperson')
      })
    }),  
  describe ('run image', () => {
    it ('creates a container and runs it', async () => {
      const event = ipcRenderer._event;
      await run(event, "test:latest", 'testc');
      let result;
      await ipcMain.on('runResult', (_event: Event, arg: boolean|string) => {
        result = arg;
      })
      await new Promise(resolve => setTimeout(resolve, 7000));
      expect(result).toBe(true)
    })
  }),
  describe ('get containers', () => {
    it ('gets a list of containers', async () => {
      //await new Promise(resolve => setTimeout(resolve, 7000));
      const list = await getContainersList(true);
      expect(list).toBeInstanceOf(Array)
      console.log(list.length)
    })
  })
  describe ('getImagesList', () => {
    it ('gets a list of images', async () => {
      const list = await getImagesList()
      expect(list).toBeInstanceOf(Array)
      
    })
  })
})