const fs = require('fs');
const copyFrom = require('pg-copy-streams').from
const path = require('path');

require('dotenv/config');
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on('error', (err, _client) => {
  
  console.error('Unexpected error on idle client', err) // your callback here
  return err;
});

const uploadData = async (table, sqlSchema) => {
  try {  
    const string = `COPY ${table} FROM STDIN DELIMITERS ',' CSV HEADER`
    await pool.connect((_err, client, done) => {
      const csvCopyString = copyFrom(string)
      const params = [table];
      const stream = client.query(csvCopyString, params);
      const fileStream = fs.createReadStream(sqlSchema);
      fileStream.on('error', (error) => {
        console.log('filestream error!', error)
        done();
        return error;
      });
      stream.on('error', (error) => {
        console.log('filestream error!', error)
        done();
        return error;
      });
      fileStream.pipe(stream);
      fileStream.on('end', done);
      return stream;
    })
  }
  catch (error) {
    return `error in data upload, ${error}`
  }
}

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }, 
  uploadData
};

