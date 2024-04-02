// build your `Project` model here
const db = require('../../data/dbConfig')

const get = async () => {
  const projects = await db('projects')
  projects.map(project => {
    if(project.project_completed === 0) {
      project.project_completed = false
    } else {
      project.project_completed = true
    }
    return project
  })
  return projects
}

const add = async newProject => {
  const [project_id] = await db('projects').insert(newProject)
  const created = await db('projects').where('project_id', project_id).first()
  if(created.project_completed === 0) {
    created.project_completed = false
  } else {
    created.project_completed = true
  }
  return created
}

module.exports = { get, add }