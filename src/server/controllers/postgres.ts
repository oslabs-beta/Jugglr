const fs = require('fs');
const copyFrom = require('pg-copy-streams').from
const path = require('path');
const env = require('../../.env')
const { Pool } = require('pg')

require('dotenv').config();
console.log(process.env.PGDATABASE);

const pool = new Pool({
  user: env.PGUSER,
  host: env.PGHOST,
  database: env.PGDATABASE,
  password: env.PGPASSWORD,
  port: env.PGPORT,
});

console.log('pool', pool);

const connect = async () => { 
  const status = await pool.connect() 
  return status;
};
connect();

const uploadData = async (table, sqlSchema) => {
  
  const csvCopyString = copyFrom(`COPY $1 FROM STDIN DELIMITERS ',' CSV HEADER`)
  const params = [table];
  const stream = await pool.query(csvCopyString, params);
  const fileStream = await fs.createReadStream(path.resolve(__dirname, sqlSchema));
    
  // fileStream.on('open', (stream) => {
  //   console.log('open!', stream);
  // })
  // fileStream.on('ready', (stream) => {  console.log('ready!', stream);
  // });
  // fileStream.on('close', (stream) => {
  //   console.log('closed!', stream);
  // });

  fileStream.on('error', (stream) => {
    console.log('filestream error!', stream)
    return stream;
  });

  const result = await fileStream.pipe(stream);
  return result;
}

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }, 
  uploadData
};