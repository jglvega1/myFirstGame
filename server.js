//imports
const http = require('http');
const express = require ('express');

//routes
const app = express();
app.use(express.static('src'));

//create server
const server = http.createServer(app);

//escuchar server
const port =  process.env.PORT || 8080;
server.listen(port, () => console.log(port));