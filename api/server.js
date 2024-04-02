// build your server here and require it from index.js
const express = require('express');
const helmet = require('helmet');
const projectRouter = require('../api/project/router');
const resourceRouter = require('../api/resource/router');
const taskRouter = require('../api/task/router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/project', projectRouter);
server.use('/api/resource', resourceRouter);
server.use('/api/task', taskRouter);



server.use('*', (req,res,next)=> {
  next({status:404,message:'not found'})
})

server.use((err,req,res, next) => {
  res.status(err.status || 500).json({
      message:err.message
  })
})


module.exports = server;
