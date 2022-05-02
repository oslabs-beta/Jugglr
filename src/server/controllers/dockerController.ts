const Docker = require('dockerode');
const lpath = require('path');
const lfs = require('fs');

const buildImage = async (image, schema, dirname=process.env.DOCKDIR) => {
  try {
    const dockerode = await  new Docker();
    const result = await dockerode.buildImage({
        context: dirname,
        src: ['Dockerfile', schema]
      }, {t: image} )
    return "success";
  }
  catch (err) {
    console.log(err); 
    return err;
  }
}


const run = async (image, containerName, port="5432") => {
  console.log('Starting Postgres container...');
  const streams = [
    process.stdout,
    process.stderr
  ];
  port = `${port}/tcp`
  const docker = await  new Docker();
  const result = await docker.run(image, ['postgres'], streams, {
    Env: [`POSTGRES_PASSWORD=${process.env.PGPASSWORD}`], WorkingDir: process.env.ROOTDIR, name: containerName, PortBindings: {
      "5432/tcp" : [ { "HostPort": "5432" } ]}, Tty: false}, (err, _data, _rawContainer) => {
        if (err) { console.log("err", err)} })
    .on('container', async function (container) {
      console.log('Postgres started');
      const containerId = await docker.getContainer(container.id);
      console.log(containerId.id)
      lfs.writeFileSync(`${process.env.DOCKDIR}/container.txt`, containerId.id, "utf8")
      return containerId.id;
  })
  return result;
  }

const runImage = async (image, containerName) => {
  try {
   
    const docker = await  new Docker();
    const result = await docker.run(image, ['postgres'], [process.stdout, process.stderr], {
      Env: [`POSTGRES_PASSWORD=${process.env.PGPASSWORD}`], WorkingDir: process.env.ROOTDIR, name: containerName, PortBindings: {
        "5432/tcp": [ { "HostPort": "5432" } ]}, Tty: false}, () => {
          console.log("start")
        }, (_err, stream) => {
          docker.modem.followProgress(stream, onFinished);

          function onFinished(_err, output) {
            return output;
          }
      });
                
    const end = await result.on('end', (data) => {
      console.log ('first end', data);
      data.remove();
    })

    const container = await result.on('container', (container) => {
      console.log(container.id)
      return container.id;
    })

    console.log('here')
    console.log('second end',end)
    } 
    catch (err) {
          console.log("error:", err);
          return(err);
        }
  }

module.exports = { buildImage, runImage, run };