// build your `Resource` model here
const db = require('../../data/dbConfig')

const get = () => {
  return db('resources')
}

const add = async newResource => {
  const [resource_id] = await db('resources').insert(newResource)
  return db('resources').where('resource_id', resource_id).first()
}

module.exports = { get, add }