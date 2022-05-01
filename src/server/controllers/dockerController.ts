

export {}
const fs = require('fs');
const path = require('path');
const Docker = require('dockerode');

//rootDir is the project directory of the user. We will also create the Jugglr folder in rootDir
//the following variables will have to be updated w data coming in from the frontend:

////frontend:: 
////frontend:: user selecting a project directory (rootDir) will invoke file.mkJugglr function. 
//For e.g., invoke file.mkJugglr() when passing path data to rootDir variable?
const rootDir: string = path.join(__dirname);
const dbName = 'db name';
const dbUser = 'db username';
const dbPwd = 'db password';
const imageName = 'image_name';
const schemaFilePath = 'schema-filepath'; //users will select their own sql schema file

const containerName = 'container-name';
const containerPort = '7676';

const pathDockerfile =  path.join(rootDir, 'Jugglr/Dockerfile');
const dockerfileContents = 
`FROM postgres:latest /
ENV POSTGRES_USER ${dbUser} /
ENV POSTGRES_PASSWORD ${dbPwd} /
ENV POSTGRES_DB ${dbName} /
WORKDIR ${rootDir}
COPY ${schemaFilePath} /docker-entrypoint-initdb.d `




const file = {
  //Creates Jugglr folder inside rootDir. Also checks if Jugglr already exists in rootDir
  mkJugglr: function () {
    fs.mkdir(path.join(rootDir, 'Jugglr'), (err) => {
      if (err) {
        return console.log('Jugglr folder already exists', err); 
      }
      console.log('Jugglr folder created successfully!');
    });
  },
    
};

file.mkJugglr();





const dockerController = {
  ////frontend:: user clicks 'Generate Docker File' button. 
    //onClick(?) calls the dockerController.createDockerfile function, passing in pathDockerfile and dockerfileContents
  createDockerfile: function (filePath, fileContent) {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) { console.log(err);}
      else { console.log('Dockerfile created successfully')}
      //will overwrite any existing Dockerfile in the folder
    });
  }, 


  ////frontend:: user clicks 'Create Docker Image' button. onClick(?) invokes dockerController.createImage
  createImage: function () {
    //image isn't being created atm
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const pathway = path.join(rootDir, 'Jugglr');
    docker1.buildImage({
      context: pathway,
      src: ['Dockerfile'] 
    }, {t: `${imageName}`}, function (err, response) {
      console.log('deep inside the bowels of Hell');
      console.log('err', err, 'here is the response: ', response);
    });
    console.log('inside imageCreator func, after docker1.buildImage')
  },


    
  //// frontend:: user enters container name and port, and clicks 'Run New Container' button
    //onClick: transfer input field info to variables containerName and containerPort 
    //AND then trigger dockerController.runNewContainer function 

  runNewContainer: function () {
    // issue: obtain containerid from funtion's local scope to global scope
    // image and port hardcoded atm
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    // const containerId = {};
    docker1.createContainer({
      Image: 'postgresdb', 
      Cmd: ['/bin/bash'], 
      name: containerName, 
      HostConfig: {PortBindings: {'7474': [{ HostPort: '7474' }]}}}, 
    function (_err, container) {
      // containerId.id = container.id;
      container.start(function (err, data) {
          console.log('err', err, 'data', data);
      });
      //send container name and id to a database?
      // return containerId;
    }
    );    
  },

  //frontend:: user clicks stop/delete/start container buttons. 
  //onClick(?) triggers dockerController.stopContainer/.deleteContainer/.startContainer function(s)
    
  startContainer: function (containerName) {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = docker1.getContainer(`${containerName}`);
        
    selectedContainer.start(function (err, data) {
      console.log('err', err, 'data', data);
      console.log('inside start container');
    });
  },

  //have to pass in containerId to function
  stopContainer: function () {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    docker1.listContainers(function (_err, containers) {
      containers.forEach(function (containerInfo) {
        console.log('inside containers.forEach');
        docker1.getContainer(containerInfo.Id).stop();
      });
    });
  },

  // deleteContainer: function (containerName) {},

  getContainers: function () {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    docker1.listContainers(function (err, containers) {
      // console.log('List all containers', containers);
      console.log('err', err);
      const allContainers = [ containers ];
    });
  },


  // getImages: function () {},
  // getVolumes: function () {},
  // getRunCommand: function (rootDir, imageName, containerName) {}​

}




dockerController.createDockerfile(pathDockerfile, dockerfileContents);
dockerController.createImage();
dockerController.runNewContainer();
dockerController.getContainers();



module.exports = dockerController;

