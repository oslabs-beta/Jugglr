
const { dialog } = require('electron');
const fpath = require('path');
const ffs = require('fs');

const fileController = {
  
    openFile: async () => {
      
      const response = await dialog.showOpenDialog({ properties: ["openFile"] })
      if (!response.canceled) {
            const fileName = response.filePaths[0];
            return fileName;
            
      } else {
         console.log("No file selected.");
         return "";
      }
    },

    openDir: async () => {
      
      const response = await dialog.showOpenDialog({ properties: ["openDirectory"] })
      if (!response.canceled) {
      
        console.log(response);
            const fileName = response.filePaths[0];
            return fileName;
            
      } else {
         console.log("No file selected.");
         return "";
      }
    },

    setProjectRoot: async (rootdir) => {
      process.env.ROOTDIR = rootdir;
      process.env.DOCKDIR = fpath.resolve(rootdir, 'jugglr');
      const dockerfl = fpath.resolve(process.env.DOCKDIR, 'Dockerfile')
      if (!ffs.existsSync(dockerfl)) return {};
      const dockerfile =  ffs.readFileSync(dockerfl).toString().split("\n");
      for (const line of dockerfile){
        const pgRegex =  /(?<=ENV )[A-Z|_]+\b/;
        const schemaRegex = /(?<=COPY.).+(?=.\/docker-entrypoint-initdb.d\/)/
        const linetype = line.match(pgRegex);
        const schema = line.match(schemaRegex)
        if (linetype) {
          const regex = /\b\w+(\b\s*)$/
          const val = line.match(regex);
          // console.log(val[0])
          process.env[linetype[0]] = val[0].trim();
          // console.log(process.env[linetype[0]])
          // console.log(process.env[linetype[0]], val[0]);
           
        } else if(schema) {
          process.env.SCHEMA = schema[0];
          console.log(process.env.SCHEMA)
        }
        
      }
      return {
        user: `${process.env.POSTGRES_USER}`,
        database: `${process.env.POSTGRES_DB}`,
        password: `${process.env.POSTGRES_PASSWORD}`
      }
    }
  }

module.exports = fileController