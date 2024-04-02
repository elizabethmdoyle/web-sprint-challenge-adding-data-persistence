// build your `Project` model here
const db = require('../../data/dbConfig')

function getProject() {
    return db('projects')
        .then(projects => projects.map(proj => ({
            ...proj, project_completed: proj.project_completed ? true : false,
        })))
        .catch((err) => console.log(err.message))
}

async function createProject(project) {
    const project_id = await db('projects').insert(project)
    const newProject = await db('projects').where('project_id', project_id).first()
    return newProject.project_completed === 0
    ? {...newProject, project_completed: false}
    : {...newProject, project_completed: true}
}

module.exports = { getProject, createProject }