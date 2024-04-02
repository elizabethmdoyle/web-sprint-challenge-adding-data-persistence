// build your `/api/projects` router here
const router = require('express').Router()
const helpers = require('./model')


router.get('/', async (req,res,next) => {
  const projects = await helpers.getProject()
  .then(project => {
    res.status(200).json(project);
  })
  .catch(next)
})

router.post ('/', (req, res, next) => {
  helpers.createProject(req.body)
  .then(project => {
    res.status(201).json(project)
  })
  .catch(next)
});

router.use((err,req,res,next) =>{
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router