exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', tbl => {
      tbl.increments('project_id')
      tbl.string('project_name', 128).notNullable()
      tbl.string('project_description')
      tbl.integer('project_completed').defaultTo(0)
    })
    .createTable('resources', tbl => {
      tbl.increments('resource_id')
      tbl.string('resource_name', 128).notNullable().unique()
      tbl.string('resource_description')
    })
    .createTable('tasks', tbl => {
      tbl.increments('task_id')
      tbl.string('task_description', 256).notNullable()
      tbl.string('task_notes')
      tbl.integer('task_completed').defaultTo(0)
      tbl.integer('project_id')
        .notNullable()
        .unsigned()
        .references('project_id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
    .createTable('project_resources', tbl => {
      tbl.increments('project_resource_id')
      tbl.integer('project_id')
        .notNullable()
        .unsigned()
        .references('project_id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      tbl.integer('resource_id')
        .notNullable()
        .unsigned()
        .references('resource_id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};