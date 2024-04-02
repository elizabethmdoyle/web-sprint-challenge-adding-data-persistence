// build your `/api/tasks` router here
const router = require('express').Router()

const tHelper = require('./model')

router.get('/', async  (req, res, next) => {
    tHelper.findTask()
    .then(tasks => {
        res.json(tasks)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    tHelper.addTask(req.body)
    .then(task => {
        res.json(task)
    })
    .catch(next)
})


router.use((err,req,res,next) =>{
    res.status(500).json({
        customMessage: 'something went wrong inside the task router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router