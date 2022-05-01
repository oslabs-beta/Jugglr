const Docker = require('dockerode');
const lpath = require('path');

//const docker = new Docker({socketPath: '/var/run/docker.sock'});

const buildImage = async () => {
  try {
    const dockerode = await  new Docker();
    const image = 'test:test'
    await dockerode.buildImage({
        context: lpath.resolve(__dirname, '../data'),
        src: ['Dockerfile', 'starwars_postgres_create.sql']
      }, {t: image} )
    return "success";
  }
  catch (err) {
    console.log(err); 
    return err;
  }
}
module.exports = buildImage;