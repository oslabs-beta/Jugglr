const ipc = require('./electron-mock')
const pg = require('../src/server/controllers/postgres');
const mpath = require('path');
jest.setTimeout(11000)

describe ("Upload data", () => {
  describe('upload data to Postgres Table', () => {
    it('loads data to table successfully', async () => {
      const event = ipc.ipcRenderer._event;
      const dataDir = mpath.join(__dirname, 'data')
      await pg.uploadData(event, `species(name, classification, average_height, average_lifespan, hair_colors, skin_colors, eye_colors, language, homeworld_id)`, `${dataDir}/species.csv`, "5432")
      let result;
      await ipc.ipcMain.on('databaseResult', (_event: Event, arg: boolean|string) => {
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
      const dataDir = mpath.join(__dirname, 'data');
      const event = ipc.ipcRenderer._event;
      await pg.uploadData(event,'species', `${dataDir}/species.csv`)
      let result;
      await ipc.ipcMain.on('databaseResult', (_event: Event, arg: boolean|string) => {
        result = arg;
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(result).toBe('Error: missing required database information')
    })
  })
});