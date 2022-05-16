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
const uploadData = async (event, table, sqlSchema, port="5432") => {
  try {  
    if (!process.env.POSTGRES_USER || !process.env.POSTGRES_DB || !process.env.POSTGRES_PASSWORD) {
      
      console.log('Error: missing required database information');
      event.sender.send('databaseResult', 'Error: missing required database information');
      return;
    }  
    process.env.POSTGRES_PORT = port; 
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST || 'localhost',
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
    });
    
    pool.on('error', (err, _client) => {
      console.log('Unexpected error on idle client', err) // your callback here
      return event.sender.send('databaseResult', err.error);
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
        return event.sender.send('databaseResult', error);
      });
      stream.on('error', (error) => {
        console.log('stream error!', error)
        //done();
        return event.sender.send('databaseResult', error);
      });
      fileStream.pipe(stream);
      fileStream.on('end', done);
      stream.on('finish', () => {
        return event.sender.send('databaseResult', true);
      }) 
    })
  }
  catch (error:any) {
    return event.sender.send('databaseResult', error);
  }
}

module.exports = {
  uploadData
};

