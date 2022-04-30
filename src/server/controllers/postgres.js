"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;
const path = require('path');
const env = require('../../.env');
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: env.PGUSER,
    host: env.PGHOST,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,
    port: env.PGPORT,
});
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield pool.connect();
    return status;
});
connect();
const uploadData = (table, sqlSchema) => __awaiter(void 0, void 0, void 0, function* () {
    const csvCopyString = copyFrom(`COPY $1 FROM STDIN DELIMITERS ',' CSV HEADER`);
    const params = [table];
    const stream = yield pool.query(csvCopyString, params);
    const fileStream = yield fs.createReadStream(path.resolve(__dirname, sqlSchema));
    // fileStream.on('open', (stream) => {
    //   console.log('open!', stream);
    // })
    // fileStream.on('ready', (stream) => {  console.log('ready!', stream);
    // });
    // fileStream.on('close', (stream) => {
    //   console.log('closed!', stream);
    // });
    fileStream.on('error', (stream) => {
        console.log('filestream error!', stream);
        return stream;
    });
    const result = yield fileStream.pipe(stream);
    return result;
});
module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    },
    uploadData
};
//# sourceMappingURL=postgres.js.map