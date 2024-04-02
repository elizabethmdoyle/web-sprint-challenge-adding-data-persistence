// build your `/api/resources` router here
const router = require('express').Router()
const rHelper = require('./model')

router.get('/', async (req,res,next) => {
    const resources = await rHelper.getResources()
    .then(resource => {
      res.status(200).json(resource);
    })
    .catch(next)
  })

router.post('/', (req, res, next) => {
    const resource = req.body
    rHelper.createResource(resource)
    .then(resource => {
        res.status(201).json(resource)
    })
    .catch(next)
})

router.use((err,req,res,next) =>{
    res.status(500).json({
        customMessage: 'something went wrong inside the resource router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router