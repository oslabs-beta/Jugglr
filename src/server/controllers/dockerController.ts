

export {}
const fs = require('fs');
const path = require('path');
const Docker = require('dockerode');

//rootDir is the project directory of the user. We will also create the Jugglr folder in rootDir
//the following variables will have to be updated w data coming in from the frontend:

////frontend:: 
////frontend:: user selecting a project directory (rootDir) will invoke file.mkJugglr function. 
//For e.g., invoke file.mkJugglr() when passing path data to rootDir variable?
const rootDir = path.join(__dirname);
const dbName = 'db name';
const dbUser = 'db username';
const dbPwd = 'db password';
const imageName = 'image_name';
const schemaFilePath = 'schema-filepath'; //users will select their sql schema file

const containerName = 'container-name';
const containerPort = '7676';


const dockerfileContents = 
`FROM postgres:latest /
ENV POSTGRES_USER ${dbUser} /
ENV POSTGRES_PASSWORD ${dbPwd} /
ENV POSTGRES_DB ${dbName} /
WORKDIR ${rootDir}
COPY ${schemaFilePath} /docker-entrypoint-initdb.d `

const pathDockerfile =  path.join(rootDir, 'Dockerfile');




const file = {
  //creating Jugglr folder inside rootDir. Also checks if Jugglr already exists in rootDir
  mkJugglr: function () {
    fs.mkdir(path.join(rootDir, 'Jugglr'), (err) => {
      if (err) {
        return console.log('Jugglr folder already exists', err); //need to test this out
      }
      console.log('Jugglr folder created successfully!');
    });
  },
    
};


const dockerController = {
  ////frontend:: user clicks 'Generate Docker File' button. onClick(?) calls the dockerController.createDockerfile function
  createDockerfile: function (filePath, fileContent) {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) { console.log(err);}
      else { console.log('Dockerfile created successfully')}
      //will overwrite any existing Dockerfile in the folder
    });
  },

  ////frontend:: user clicks 'Create Docker Image' button. onClick(?) invokes dockerController.createImage
  createImage: function () {
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
  //AND then trigger dockerController.createContainer function 

  runNewContainer: function () {
    // issue: obtain containerid from funtion's local score to global scope
    // image and port hardcoded atm
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const containerId = {};
    docker1.createContainer({
      Image: 'postgresdb', 
      Cmd: ['/bin/bash'], 
      name: containerName, 
      HostConfig: {PortBindings: {'7474/tcp': [{ HostPort: '7474' }]}}}, 
    function (err, container) {
      containerId.id = container.id;
      container.start(function (err, data) {
        //   console.log('inside container.start');
        //   console.log('err', err, 'data', data);
      });
      console.log('containerId', containerId);
      //send container name and id to a database
      return containerId;
    }
    );    
    console.log('outside', containerId);
  },

  //frontend:: user clicks stop/delete/start container buttons. 
  //onClick(?) triggers dockerController.stopContainer/.deleteContainer/.startContainer function(s)
    
  startContainer: function (containerName) {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = docker1.getContainer(`${containerName}`);
        
    selectedContainer.start(function (err, data) {
      // console.log(data);
      console.log('inside start container');
    });
  },

  //have to pass in containerId to function
  stopContainer: function () {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    docker1.listContainers(function (err, containers) {
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
      const allContainers = [ containers ];
    });
  },


  // getImages: function () {},
  // getVolumes: function () {},
  // getRunCommand: function (rootDir, imageName, containerName) {}​

}

dockerController.createDockerfile(pathDockerfile, dockerfileContents);






/*
PGDATABASE= "$PGDATABASE" || 'postgres'
PGUSER= "$PGUSER" || 'postgres'
PGPASSWORD= "$PGPASSWORD" || 'postgres'
PGPORT= "$DBPORT" || 5432
*/