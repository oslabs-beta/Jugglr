const Docker = require('dockerode');
const path = require('path');
const buildImage = require('../src/server/controllers/dockerController');

describe ("Dockerfile Create", () => {
  describe('create image', () => {
    it('builds an image from the Dockerfile', async () => {
      const result = await buildImage();
      expect(result).toEqual('success');
    })
  })
})
