// implement your server here
// require your posts router and connect it here
const express = require('express');
const server = express();
const postsRouter = require('./api/posts/posts-router');
const  cors = require('cors');

server.use(express.json());
server.use(cors());
server.use('/api/posts', postsRouter);


module.exports = server;
