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
  })
});