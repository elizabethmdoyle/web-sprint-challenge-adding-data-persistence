exports.up = function (knex) {
  return knex.schema
  .createTable('projects', tbl => {
    tbl.increments('project_id');
    tbl.varchar('project_name', 50).unique().notNullable()
    tbl.varchar('project_description', 200)
    tbl.boolean('project_completed').defaultsTo(false)
  })
  .createTable('resources', tbl => {
    tbl.increments('resource_id');
    tbl.varchar('resource_name', 100).unique().notNullable()
    tbl.varchar('resource_description', 250)
  })
  .createTable('tasks', tbl => {
    tbl.increments('task_id');
    tbl.varchar('task_description', 250).notNullable()
    tbl.varchar('task_notes', 250)
    tbl.boolean('task_completed').defaultsTo(false)
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  })
};


exports.down =  async function(knex) {
  await knex.schema
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
};