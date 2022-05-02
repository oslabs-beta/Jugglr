const Docker = require('dockerode');
const lpath = require('path');
const lfs = require('fs');

const mPGDATABASE = process.env.PGDATABASE || "postgres"
const mPGUSER = process.env.PGUSER || "postgres"
const mPGPASSWORD = process.env.PGPASSWORD || "postgres"
const mPGPORT = process.env.DBPORT || 5432
const dirname = lpath.resolve(__dirname, '../data');
const image = 'test:test';
const schema = 'starwars_postgres_create.sql';
const containerNm = "testcontainer";
const command = 'postgres';

const buildImage = async () => {
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


const run = async () => {
  console.log('Starting Postgres container...');
  const streams = [
    process.stdout,
    process.stderr
  ];
  const docker = await  new Docker();
  const result = await docker.run(image, ['postgres'], streams, {
    Env: [`POSTGRES_PASSWORD=${mPGPASSWORD}`], WorkingDir: dirname, name: containerNm, PortBindings: {
      "5432/tcp": [ { "HostPort": "5432" } ]}, Tty: false}, (err, _data, _rawContainer) => {
        if (err) { console.log("err", err)} })
    .on('container', async function (container) {
      console.log('Postgres started');
      const containerId = await docker.getContainer(container.id);
      console.log(containerId.id)
      lfs.writeFileSync(`${dirname}/container.txt`, containerId.id, "utf8")
      return containerId.id;
  })
  return result;
  }








const runImage = async () => {
  try {
   
    const docker = await  new Docker();
    const result = await docker.run(image, ['postgres'], [process.stdout, process.stderr], {
      Env: [`POSTGRES_PASSWORD=${mPGPASSWORD}`], WorkingDir: dirname, name: containerNm, PortBindings: {
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