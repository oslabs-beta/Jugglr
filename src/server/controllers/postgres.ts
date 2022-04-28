const { Pool } = require('pg');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from
import path from 'path';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

pool.connect(function (_err, client, done) {
  
  const stream = client.query(copyFrom(`COPY people FROM STDIN DELIMITERS ',' CSV HEADER`))
  
  const fileStream = fs.createReadStream(path.resolve(__dirname, 'people.csv'));
    
  fileStream.on('open', (stream) => {
    console.log('open!', stream);
  });

  fileStream.on('ready', (stream) => {  console.log('ready!', stream);
  });
  
  fileStream.on('close', (stream) => {
    console.log('closed!', stream);
  });

  fileStream.on('error', (stream) => {
    console.log('filestream error!', stream)});

  stream.on('error', (stream) => {
      console.log('stream error!', stream)});

  stream.on('error', done)
  stream.on('finish', done)
  fileStream.pipe(stream);
  
})
