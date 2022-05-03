const pg = require('../src/server/controllers/postgres');
const mpath = require('path');
jest.setTimeout(11000)

describe ("Upload data", () => {
  describe('upload data to Postgres Table', () => {
    it('loads data to table successfully', async () => {
      const dataDir = mpath.join(__dirname, 'data')
      const result = await pg.uploadData('people', `${dataDir}/people.csv`)
      await new Promise(resolve => setTimeout(resolve, 10000));
      expect(result).toBeTruthy
    })
  }),
  describe ('returns error if information needed to connect to the DB is missing', () => {
    it('returns error if environment variables are not set', async() => {
      delete process.env.POSTGRES_DB;
      delete process.env.POSTGRES_USER;
      delete process.env.POSTGRES_PASSWORD;
      delete process.env.POSTGRES_PORT;
      const dataDir = mpath.join(__dirname, 'data')
      const result = await pg.uploadData('people', `${dataDir}/people.csv`)
      expect(result).toBe('Error: missing required database information')
    })
  })
});