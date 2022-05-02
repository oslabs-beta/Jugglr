

export {}
const fs = require('fs');
const path = require('path');
const lpath = require('path');
const Docker = require('dockerode');

//rootDir is the project directory of the user. We will also create the Jugglr folder in rootDir
//the following variables will have to be updated w data coming in from the frontend:

////frontend:: 
////frontend:: user selecting a project directory (rootDir) will invoke file.mkJugglr function. 
//For e.g., invoke file.mkJugglr() when passing path data to rootDir variable?
const rootDir: string = path.join(__dirname);
const dbName = 'postgres';
const dbUser = 'postgres';
const dbPwd = 'postgres';
const imageName = 'imagename:imagename';
const schemaFilePath = path.resolve(__dirname, './Jugglr/starwars_postgres_create.sql') 
  //users will select their own sql schema file
  //note: can't use abs path for sql file in Dockerfile
  //for our team: after creating Jugglr folder, drag and drop starwars_postgres_create.sql into it

const containerName = 'yuuge-container';
const containerPort = '7676';

const pathDockerfile =  path.join(rootDir, 'Jugglr/Dockerfile');
const dockerfileContents = 
`FROM postgres:latest 
ENV POSTGRES_USER ${dbUser} 
ENV POSTGRES_PASSWORD ${dbPwd} 
ENV POSTGRES_DB ${dbName} 
WORKDIR /usr/app
COPY starwars_postgres_create.sql /docker-entrypoint-initdb.d/ `




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
    fs.writeFile(filePath, fileContent, { flag: "wx" }, (err) => {
      if (err) { console.log(err);}
      else { console.log('Dockerfile created successfully')}
      //will error out if any Dockerfile already present in folder
    });
  }, 


  ////frontend:: user clicks 'Create Docker Image' button. onClick(?) invokes dockerController.createImage
  createImage:  function () {
      const docker1 = new Docker();
      console.log(imageName);
       docker1.buildImage({
        context: lpath.resolve(__dirname, './Jugglr'),
        src: ['Dockerfile', 'starwars_postgres_create.sql']
      }, {t: imageName})

      return "image created";
      
  },


    
  //// frontend:: user enters container name and port, and clicks 'Run New Container' button
    //onClick: transfer input field info to variables containerName and containerPort 
    //AND then trigger dockerController.runNewContainer function 

  // runNewContainer: 
  // port hardcoded atm
  runNewContainer: function () {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    docker1.createContainer({ 
      Image: `${imageName}`, 
      Tty: false, 
      name: `${containerName}`, 
      PortBindings: { "80/tcp": [{ "HostPort": "7676" }] } }, 
      function (err,container){
        console.log(err);
        container.start();
        //will error if a container w the same name exists
    })
  },

  //frontend:: user clicks stop/delete/start container buttons. 
  //onClick(?) triggers dockerController.stopContainer/.deleteContainer/.startContainer function(s)
    
  startContainer: function (nameofContainer) {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = docker1.getContainer(nameofContainer);
        
    selectedContainer.start(function (err, data) {
      console.log('err', err, 'data', data);
    });
  },



  stopContainer: function (nameofContainer) {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = docker1.getContainer(`${nameofContainer}`);
        
    selectedContainer.stop(function (err, data) {
      console.log('err', err, 'data', data);
    });
  },

  
  removeContainer: function (nameofContainer) {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    const selectedContainer = docker1.getContainer(`${nameofContainer}`);
        
    selectedContainer.remove();
  },



  getContainersList: function () {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    docker1.listContainers(function (err, containers) {
      // console.log('List all containers', containers);
      console.log('err', err);
      console.log(containers);
    });
  },



  stopAllContainers: function () {
    const docker1 = new Docker({socketPath: '/var/run/docker.sock'});
    docker1.listContainers(function (_err, containers) {
      containers.forEach(function (containerInfo) {
        docker1.getContainer(containerInfo.Id).stop();
      });
    });
  },


  // getImages: function () {},
  // getVolumes: function () {},
  // getRunCommand: function (rootDir, imageName, containerName) {}

}





//invoking the functions
dockerController.createDockerfile(pathDockerfile, dockerfileContents);
dockerController.createImage();
dockerController.runNewContainer();
// dockerController.getContainersList();

dockerController.startContainer(containerName);
// dockerController.stopContainer(containerName);
// dockerController.removeContainer(containerName);
// dockerController.stopAllContainers();

console.log('hello')





//image creator function method B - using async await
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
// buildImage();






module.exports = dockerController;
// module.exports = buildImage;
