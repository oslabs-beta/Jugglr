const { ipcMain, ipcRenderer } = require('./electron-mock')
const Docker = require('dockerode');
const path = require('path');
const { createDockerfile, buildImage, run, getContainersList , getImagesList, stopContainer, startContainer, removeContainer} = require('../src/server/controllers/dockerController');
const fs = require('fs')
const pg = require('../src/server/controllers/postgres');
jest.setTimeout(20000);
process.env.SCHEMA = path.resolve(`${process.env.ROOTDIR}`, 'data/starwars_postgres_create.sql')
let container1;
let container2;

describe('Docker and Postgres tests', () => {
  describe ("Dockerfile Create", () => {
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
    }),
  it ('creates a Dockerfile if none exists', async () => {
      const dFile = path.resolve(process.env.DOCKDIR, 'Dockerfile');
      await fs.access(dFile, (err) => { if (!err) fs.unlinkSync(dFile, (err) => {
        if (err) console.log('error deleting Dockerfile')
         }) 
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      const result = await createDockerfile(Dockerfile);
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(fs.existsSync(dFile)).not.toThrowError;
      const file = fs.readFileSync(dFile, { encoding: 'utf8'} );
      expect(file).not.toContain('newperson')
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        expect(result).toThrowError
      }), 
      it('builds an image from the Dockerfile', async () => {
        const event = ipcRenderer._event;
        buildImage(event, 'test');
        let result;
        await ipcMain.on('buildImageResult', (_event: Event, arg: boolean|string) => {
          result = arg;
        })
        await new Promise(resolve => setTimeout(resolve, 3000));
        expect(result).toBe(true);
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
      await new Promise(resolve => setTimeout(resolve, 4000));
      expect(result).toBe(true)
    })
  }),
  describe ("Upload data", () => {
    describe('upload data to Postgres Table', () => {
      it('loads data to table successfully', async () => {
        const event = ipcRenderer._event;
        const dataDir = path.join(__dirname, 'data')
        await pg.uploadData(event, `species(name, classification, average_height, average_lifespan, hair_colors, skin_colors, eye_colors, language, homeworld_id)`, `${dataDir}/species.csv`, "5432")
        let result;
        await ipcMain.on('databaseResult', (_event: Event, arg: boolean|string) => {
          result = arg;
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(result).toBe(true)
      })
    }),
    describe ('returns error if information needed to connect to the DB is missing', () => {
      it('returns error if environment variables are not set', async() => {
        delete process.env.POSTGRES_DB;
        delete process.env.POSTGRES_USER;
        delete process.env.POSTGRES_PASSWORD;
        delete process.env.POSTGRES_PORT;
        const dataDir = path.join(__dirname, 'data');
        const event = ipcRenderer._event;
        await pg.uploadData(event,'species', `${dataDir}/species.csv`)
        let result;
        await ipcMain.on('databaseResult', (_event: Event, arg: boolean|string) => {
          result = arg;
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(result).toBe('Error: missing required database information')
      })
    })
  }),
  describe ('work with containers', () => {
    it ('gets a list of containers', async () => {
      //await new Promise(resolve => setTimeout(resolve, 7000));
      const list = await getContainersList(true);
      const formatted = list.map(object => {
        const id = object.Id;
        const names = object.Names;
        const image = object.Image;
        const imageId = object.ImageID;
        const port = object.Ports[0].PublicPort;
        return { id, names, image, imageId, port }
      })
      container1 = formatted[0].id;
      expect(list).toBeInstanceOf(Array)
    }),
    it ('stops a container', async () => {
      const event = ipcRenderer._event;
      await stopContainer(event, container1)
      let result;
      await ipcMain.on('stopContainerResult', (_event: Event, arg: boolean|string) => {
        result = arg;
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(result).toBe(true)
    }),
    it ('returns a stopped container when "all" is specified', async () => {
      //await new Promise(resolve => setTimeout(resolve, 7000));
      const list = await getContainersList( {all: true} );
      const formatted = list.map(object => {
        const id = object.Id;
        const names = object.Names;
        const image = object.Image;
        const imageId = object.ImageID;
        const port = object.Ports[0]?.PublicPort;
        const state = object.State;
        return { id, names, image, imageId, port, state }
      })
      expect(formatted[0].id).toEqual(container1);
      expect(formatted[0].state).toEqual('exited');
    }),
    it ('does not return a stopped container when "all" is false', async () => {
      const list = await getContainersList(false);
      expect(list).toHaveLength(0);
    }),
    it ('starts a container', async () => {
      const event = ipcRenderer._event;
      await startContainer(event, container1)
      let result;
      await ipcMain.on('startContainerResult', (_event: Event, arg: boolean|string) => {
        result = arg;
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(result).toBe(true)
    }),
    it ('does not remove a running container', async () => {
      const event = ipcRenderer._event;
      await removeContainer(event, container1)
      let result;
      await ipcMain.on('removeContainerResult', (_event: Event, arg: boolean|string) => {
        result = arg;
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(result).toThrowError
    }),
    it ('removes a stopped container', async () => {
      const event = ipcRenderer._event;
      await stopContainer(event, container1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await removeContainer(event, container1);
      let result;
      await ipcMain.on('removeContainerResult', (_event: Event, arg: boolean|string) => {
        result = arg;
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(result).toBe(true);
    })
  })
  describe ('getImagesList', () => {
    it ('gets a list of images', async () => {
      const list = await getImagesList()
      expect(list).toBeInstanceOf(Array);
    })
  })
})