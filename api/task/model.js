// build your `Task` model here
const db = require('../../data/dbConfig')

const get = async () => {
  const tasks = await db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
  
  tasks.map(task => {
    if(task.task_completed === 0) {
      task.task_completed = false
    } else {
      task.task_completed = true
    }
    return task
  })
  return tasks
}

const add = async newTask => {
  const [task_id] = await db('tasks').insert(newTask)
  const created = await db('tasks').where('task_id', task_id).first()
  if(created.task_completed === 0) {
    created.task_completed = false
  } else {
    created.task_completed = true
  }
  return created
}

module.exports = { get, add }