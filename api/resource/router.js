// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/', (req, res, next) => {
  Resource.get()
    .then(resources => {
      res.json(resources)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Resource.add(req.body)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something went wrong in the resources router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router