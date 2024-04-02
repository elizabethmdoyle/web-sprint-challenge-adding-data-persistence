// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      'tasks.task_completed',
      'projects.project_name',
      'projects.project_description' 
    );
}


const create = async (taskData) => {
    const [taskId] = await db('tasks').insert(taskData)
    return findById(taskId)
}

const findById = async (taskId) => {
    return db('tasks').where({ task_id: taskId }).first();
  };
module.exports = {
    getAll,
    create
}