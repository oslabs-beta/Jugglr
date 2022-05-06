const fs = require('fs');
const copyFrom = require('pg-copy-streams').from
const path = require('path');


const { Pool } = require('pg')

/**
 * 
 * @param table table with data that user can upload into the dockerized database
 * @param sqlSchema sql schema file of the data to be uploaded
 * @returns result of client.query
 */
const uploadData = async (table, sqlSchema) => {
  try {  
    if (!process.env.POSTGRES_USER || !process.env.POSTGRES_DB || !process.env.POSTGRES_PASSWORD) {
      
      console.log('Error: missing required database information');
      return 'Error: missing required database information';
    }   
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST || 'localhost',
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT || '5432',
    });
    
    pool.on('error', (err, _client) => {
      console.error('Unexpected error on idle client', err) // your callback here
      return err;
    });
    const string = `COPY ${table} FROM STDIN DELIMITERS ',' CSV HEADER`
    await pool.connect((_err, client, done) => {
      const csvCopyString = copyFrom(string)
      const params = [table];
      const stream = client.query(csvCopyString, params);
      const fileStream = fs.createReadStream(sqlSchema);
      fileStream.on('error', (error) => {
        console.log('first filestream error!', error)
        done();
        return error;
      });
      stream.on('error', (error) => {
        console.log('stream error!', error)
        //done();
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
  uploadData
};

