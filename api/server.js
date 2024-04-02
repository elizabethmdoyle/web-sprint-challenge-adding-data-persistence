// build your server here and require it from index.js
const express = require('express')
const helmet = require('helmet')
const projectRouter = require('./project/router')
const resourceRouter = require('./resource/router')
const taskRouter = require('./task/router')

const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger)

server.use('/api/projects', projectRouter)
server.use('/api/resources', resourceRouter)
server.use('/api/tasks', taskRouter)

server.use('*', (req, res) => {
  res.status(404).json({
    error: 'the resource you are looking for does not exist'
  })
})

module.exports = server