// build your `/api/tasks` router here

const express = require('express')
const router = express.Router()
const Task = require('./model')

router.use(express.json())

router.post('/',async (req,res,next) => {
    try{const newTask = await Task.create(req.body)
        const booleanTask = {
            ...newTask,
            task_completed: Boolean(newTask.task_completed)
        }
    res.json(booleanTask)
    } catch(err){
        next(err)
    }
})


router.get('/', async (req,res,next) => {
    try{
        const tasks = await Task.getAll()
        const tasksWithBooleanCompleted = tasks.map(task => ({
            ...task,
            task_notes: task.task_notes,
            task_description: task.task_description,
            task_completed: Boolean(task.task_completed),
          }));
        res.json(tasksWithBooleanCompleted)
    } catch(err){
        next(err)
    }
})

module.exports = router