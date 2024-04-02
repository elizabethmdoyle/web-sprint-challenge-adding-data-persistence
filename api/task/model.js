// build your `Task` model here
const db = require('../../data/dbConfig')

async function findTask() {
    const tasks = await db('tasks')
        .join('projects', 'projects.project_id', 'tasks.project_id')
        .select('tasks.task_id', 'tasks.task_description', 'tasks.task_notes', 'tasks.task_completed', 'projects.project_name', 'projects.project_description')
    return tasks.map(task => task.task_completed === 0 ? {...task, task_completed: false} : { ...task, task_completed: true})
}

async function addTask(task) {
    const task_id = await db('tasks').insert(task)
    const newTask = await db('tasks').where('task_id', task_id).first()
    return newTask.task_completed === 0
    ?{...newTask, task_completed: false}
    :{...newTask, task_completed: true}
}

module.exports = {
    findTask,
    addTask
}