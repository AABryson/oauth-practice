
const { Client } = require("pg");

let DB_URI = 'postgresql:///gloriousbooks'

db = new Client({
    connectionString: DB_URI
});


db.connect();



module.exports = db;