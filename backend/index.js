
// const app = require("./app");
// // const createTables = require('./createTables')

// // createTables()
// // console.log('tables created')

// app.listen(3001, () => {
//     console.log('backend listening on port 3001')
// })
// index.js
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors())

// Create a server object
const server = http.createServer((req, res) => {
	// Set the response header
	res.writeHead(200, {'Content-Type': 'text/plain'});
	// Write some text to the response
	res.end('Welcome!');
});

// Define the port to listen on
const port = 3001;

// Start the server
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
