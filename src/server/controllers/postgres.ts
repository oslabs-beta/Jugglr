
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from
const path = require('path');
const PGDATABASE = process.env.PGDATABASE || "postgres"
const PGUSER = process.env.PGUSER || "postgres"
const PGPASSWORD = process.env.PGPASSWORD || "postgres"
const PGPORT = process.env.DBPORT || 5432
const PGHOST = process.env.PGHOST || "localhost"
const { Pool } = require('pg')

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});

pool.on('error', (err, _client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  return err;
});

const uploadData = async (table, sqlSchema) => {
  try {  
    await pool.connect()
    const csvCopyString = copyFrom(`COPY $1 FROM STDIN DELIMITERS ',' CSV HEADER`)
    const params = [table];
    const stream = await pool.query(csvCopyString, params);
    const fileStream = await fs.createReadStream(path.resolve(__dirname, sqlSchema));

    fileStream.on('error', (error) => {
      console.log('filestream error!', error)
      stream.release();
      return error;
    });
    const result = await fileStream.pipe(stream);
    stream.release();
    return result;
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