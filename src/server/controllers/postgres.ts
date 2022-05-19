const fs = require('fs');
const copyFrom = require('pg-copy-streams').from
const path = require('path');


const { Pool } = require('pg')

/**
 * @param event event emitter to use for returning async results to front end
 * @param table table with data that user can upload into the dockerized database
 * @param sqlSchema sql schema file of the data to be uploaded
 * @param port port to attach container to
 * @returns true if succeeds or error message if fails
 */
const uploadData = async (event, table, sqlSchema, port="5432") => {
  try {  
    if (!process.env.POSTGRES_USER || !process.env.POSTGRES_DB || !process.env.POSTGRES_PASSWORD) {
      event.sender.send('databaseResult', 'Error: missing required database information');
      return 'Error: missing required database information';
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
      return event.sender.send('databaseResult', err.error);
    });
    const string = `COPY ${table} FROM STDIN DELIMITERS ',' CSV HEADER`
    await pool.connect((_err, client, done) => {
      const csvCopyString = copyFrom(string)
      const params = [table];
      const stream = client.query(csvCopyString, params);
      const fileStream = fs.createReadStream(sqlSchema);
      fileStream.on('error', (error) => {
        return event.sender.send('databaseResult', error);
      });
      stream.on('error', (error) => {
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

