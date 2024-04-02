// build your `Project` model here
const db = require('./../../data/dbConfig');

const getAll = () => {
    return db('projects')
}


const create = async (projectData) => {
    projectData.project_completed = !!projectData.project_completed;
    const [projectId] = await db('projects').insert(projectData)
    return findById(projectId)
}

const findById = async (projectId) => {
    return db('projects').where({ project_id: projectId }).first();
  };

module.exports ={
    getAll,
    create,
    findById
}