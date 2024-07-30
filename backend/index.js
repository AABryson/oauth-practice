
const app = require("./app");
// // const createTables = require('./createTables')

// // createTables()
// // console.log('tables created')

// app.listen(3001, () => {
//     console.log('backend listening on port 3001')
// })
// index.js
// import http from 'http';

// Create a server object
const server = app.createServer((req, res) => {
	// Set the response header
	res.writeHead(200, {'Content-Type': 'text/plain'});
	// Write some text to the response
	res.end('Welcome to my simple Node.js app!');
});

// Define the port to listen on
const port = 3001;

// Start the server
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
