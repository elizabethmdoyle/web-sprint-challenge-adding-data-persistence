// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Project.add(req.body)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something went wrong in the projects router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router