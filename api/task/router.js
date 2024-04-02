// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', (req, res, next) => {
  Task.get()
    .then(tasks => {
      res.json(tasks)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Task.add(req.body)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something went wrong in the tasks router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router