
const lfs = require('fs');
const lpath = require('path');
const Docker = require('dockerode');


const dockerController = {
  /**
   * createDockerfile function creates a dockerfile 
   * based on paramaters supplied. Dockerfile is created in a directory named
   * "jugglr", attached to the project root directory. jugglr directory
   * is created if it doesn't exist. Note, each time this function
   * is called it will overwrite any exiting Dockerfile at this location.
   * @param dockerfile 
   * type DockerFile = {
   *   from: string | 'postgres:latest' ,  => the base image for the docker container
   *   user: string | 'postgres' ,         => the username for the postgres database
   *   host: string | 'localhost' ,        => host for the postgres database
   *   database: string | 'postgres' ,     => postgres database name
   *   password: string | 'postgres' ,     => postgres database password
   *   port: string | "5432" ,             => port for postgres to attach to
   *   rootDir: rootDir,                   => root directory of project where dockerfile will reside
   *   schema?: schema                     => schema to load to postgres, in the form of a .sql file
   * } 
   * @returns true/false
   */
  
  createDockerfile: async (dockerfile) => {
    const { from, user, host, database, password, port, rootDir, schema } = dockerfile;
   
    process.env.ROOTDIR = rootDir;
    process.env.DOCKDIR = lpath.resolve(rootDir, 'jugglr');
    process.env.POSTGRES_DB = database;
    process.env.POSTGRES_PASSWORD = password;
    process.env.POSTGRES_USER = user;
    process.env.POSTGRES_PORT = port || '5432';
    process.env.SCHEMA = schema;

    const relSchema = lpath.relative(process.env.ROOTDIR, schema);
    const From = from || 'postgres:latest'
    const dockerfileContents = 
      `FROM ${From} 
      ENV POSTGRES_USER ${process.env.POSTGRES_USER} 
      ENV POSTGRES_PASSWORD ${process.env.POSTGRES_PASSWORD} 
      ENV POSTGRES_DB ${process.env.POSTGRES_DB} 
      WORKDIR ${process.env.ROOTDIR}
      COPY ${relSchema} /docker-entrypoint-initdb.d/ `

    if (!lfs.existsSync(process.env.DOCKDIR)){
      lfs.mkdirSync(process.env.DOCKDIR);
    } 
    const dFile = lpath.resolve(process.env.DOCKDIR, 'Dockerfile')
    try {
      lfs.writeFileSync(dFile, dockerfileContents, { flag: "w" });
    } catch (err) {
      console.log(err);
      return false;
    } 
    console.log('Dockerfile successfully created');
    return true;

  },
  
 /**
  * Starts an existing container if that container is not running
  * @param event       => event emitter to use for returning async results to front end
  * @param containerId => id of container to start
  * @returns true/false
  */
  startContainer: async function (event, containerId) {
    const docker = await new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = await docker.getContainer(containerId);
    await selectedContainer.start(function (err, data) {
      console.log('err', err, 'data', data);
      if (err !== null) { 
         event. sender.send('startContainerResult', false) 
      } else {
        event.sender.send('startContainerResult', true)
      }
    });
    return true;
  },


/**
 * Stops a container if that container is running
 * @param event       => event emitter to use for returning async results to front end
 * @param containerId   => id of container to stop
 * @returns true/false
 */
  stopContainer: async function (event, containerId) {
    const docker = await new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = await docker.getContainer(`${containerId}`);
    await selectedContainer.stop(function (err, data) {
      console.log('err', err, 'data', data);
      if (err !== null) { 
         event. sender.send('stopContainerResult', false) 
      } else {
        event.sender.send('stopContainerResult', true)
      }
    });
    return true;
  },

/**
 * Deletes a container
 * @param event       => event emitter to use for returning async results to front end
 * @param containerId => container to delete
 * @returns 
 */  
  removeContainer: async function (event, containerId) {
    const docker = await new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = await docker.getContainer(`${containerId}`);    
    const result = await selectedContainer.remove(function (err, data) {
      console.log('err', err, 'data', data);
      if (err !== null) { 
         event. sender.send('removeContainerResult', false) 
      } else {
        event.sender.send('removeContainerResult', true)
      }
    });
    return result;
  },
/**
 * Returns an array with information aboutimages available in Docker
 * For example:
 * [
 *  {
*    "Id": "sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8",
*    "ParentId": "",
*    "RepoTags": [
*      "ubuntu:12.04",
*      "ubuntu:precise"
*    ],
*    "RepoDigests": [
*      "ubuntu@sha256:992069aee4016783df6345315302fa59681aae51a8eeb2f889dea59290f21787"
*    ],
*    "Created": 1474925151,
*    "Size": 103579269,
*    "VirtualSize": 103579269,
*    "SharedSize": 0,
*    "Labels": { },
*    "Containers": 2
*   }
*  ]
 * @returns a an array of images available in Docker
 */
  getImagesList: async () => {
    const docker = await new Docker({socketPath: '/var/run/docker.sock'})
    const list = await docker.listImages()
    .then(list => {  return list })
    return list;
   
  },
/**
 * 
 * @returns an array of containers running in Docker
 * for example:
 * [
 *   {
 *   "Id": "8dfafdbc3a40",
 *   "Names": [
 *     "/boring_feynman"
 *   ],
 *   "Image": "ubuntu:latest",
 *   "ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
 *   "Command": "echo 1",
 *   "Created": 1367854155,
 *   "State": "Exited",
 *   "Status": "Exit 0",
 *   "Ports": [
 *    {
 *      "PrivatePort": 2222,
 *      "PublicPort": 3333,
 *      "Type": "tcp"
 *    }
 *   ],
 *   "Labels": {
 *     "com.example.vendor": "Acme",
 *     "com.example.license": "GPL",
 *     "com.example.version": "1.0"
 *   },
 *   "SizeRw": 12288,
 *   "SizeRootFs": 0,
 *   "HostConfig": {
 *     "NetworkMode": "default"
 *   },
 *   "NetworkSettings": {
 *     "Networks": {}
 *   },
 *   "Mounts": [
 *     {
 *       "Name": "fac362...80535",
 *       "Source": "/data",
 *       "Destination": "/data",
 *       "Driver": "local",
 *       "Mode": "ro,Z",
 *       "RW": false,
 *       "Propagation": ""
 *     }
 *   ]
 *  }
 * ]
  */
 getContainersList: async () => {
    const docker = await new Docker({socketPath: '/var/run/docker.sock'})
    const list = await docker.listContainers({all: true})
    .then(list => { return list })
    return list;
   
  },
/**
 * Stops any containers running in Docker
 */
  stopAllContainers: async ()=> {
    const docker = await new Docker({socketPath: '/var/run/docker.sock'});
    await docker.listContainers(function (_err, containers) {
      containers.forEach(function (containerInfo) {
        docker.getContainer(containerInfo.Id).stop();
      });
    });
  },
/**
 * creates a Docker image based on instructions in Dockerfile
* @param event         => event emitter to return result to front end 
* @param image => image name
 * @returns true/balse
 */
  buildImage:  async (event, image) => {
    try {
      const schema = process.env.SCHEMA
      const relSchema = lpath.relative(process.env.DOCKDIR, schema);
      const dockerode = await  new Docker();
      console.log(process.env.DOCKDIR)
      const stream = await dockerode.buildImage({
            context: process.env.DOCKDIR,
            src: ['Dockerfile', `${relSchema}`]}, 
            {t: image})
      await new Promise((_resolve, _reject) => {
        dockerode.modem.followProgress(stream, () => {
            event.sender.send('buildImageResult', true);      
        })
      })
    }
    catch (err) {
      console.log('Error building image here', err); 
      event.sender.send('buildImageResult', false);
      return false;
    }
    return true;
  },
  
  /**
   * Runs a postgres image in a container
   * @param event         => event emitter to return result to front end
   * @param image         => image name
   * @param containerName => container name to apply
   * @param port          => port to attach container to
   * @returns 
   */
  run: async (event, image, containerName, port="5432") => {
    const streams = [
      process.stdout,
      process.stderr
    ];
    const docker = await  new Docker();
    const result = await docker.run(image, ['postgres'], streams, {
      Env: [`POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD}`], WorkingDir: process.env.ROOTDIR, name: containerName, PortBindings: {
        [`${port}/tcp`] : [ { "HostPort": `${port}` } ]}, Tty: false}, (err, _data, _rawContainer) => {
          if (err) { console.log("err", err)} })
      .on('error', (err) => {
        console.log('error', err);
        event.sender.send('runResult', false);
      })
      .on('end', (data) => {
        console.log('end', data)
      })
      .on('container', async function (_container) {
        console.log('Postgres started');
        event.sender.send('runResult', true);
    })
    streams[1].on('end', (data) => {
      console.log('streams data', data)
    })
    streams[0].on('end', (data) => {
      console.log('nothing', data)
    })
    streams[0].on('error', (err) => {
      console.log('streams error', err)
    })
    return result;
    }
}

module.exports = dockerController;
