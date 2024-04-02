/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
        .createTable('projects',table => {
            table.increments('project_id')
            table.string('project_name',200).notNullable()
            table.string('project_description',200)
            table.boolean('project_completed')
            
        })
        .createTable('resources',table => {
            table.increments('resource_id')
            table.string('resource_name').notNullable().unique()
            table.string('resource_description')
        })
        .createTable('tasks',table => {
            table.increments('task_id')
            table.string('task_description').notNullable()
            table.string('task_notes')
            table.integer('task_completed').defaultTo(0)
            table.integer('project_id')
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        })
        .createTable('project_resources',table => {
            table.increments('assignment_id')
            
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists('project_resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
};