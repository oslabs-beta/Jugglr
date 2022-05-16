const fileCtrlr = require('../src/server/controllers/fileController.ts');

describe ("Gets Dockerfile Information", () => {
  describe('Returns Dockerfile information if Dockerfile Exists', () => {
    // promise resolves. See https://jestjs.io/docs/en/asynchronous
    it('finds and parses the Dockerfile', async () => {
      const response = await fileCtrlr.setProjectRoot(process.env.ROOTDIR);
      expect(response).toHaveProperty('user');
      expect(response).toHaveProperty('database');
      expect(response).toHaveProperty('password');      
      expect(response).toHaveProperty('schema');
      expect(response.schema).toMatch (/starwars_postgres_create.sql/)
    })
  }),
  describe ('No Dockerfile Exists', () => {
    it ('returns an empty object if no Dockerfile exists', async () => {
      const response = await fileCtrlr.setProjectRoot(process.env.DOCKDIR);
      expect(response).toBeInstanceOf(Object);
      expect(response).toMatchObject({})
    })
  })
})