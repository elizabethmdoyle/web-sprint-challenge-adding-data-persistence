/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
      .createTable("projects", (table) => {
        table.increments("project_id");
        table.string("project_name", 200).notNullable().unique();
        table.string("project_desctipion", 200);
        table.integer("project_completed", 200).notNullable(0).unique();


      })
      .createTable("resources", (table) => {
        table.increments("resource_id");
        table.string("resource_name", 200).notNullable().unique();
        table.string("resource_description", 50);
      })
      .createTable("tasks", (table) => {
        table.increments("task_id");
        table.string("task_description", 200).notNullable();
        table.integer("task_notes").notNullable();
        table.integer("task_completed", 200).notNullable(0).unique();

        table
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("project_id")
          .inTable("projects")
          .onDelete("RESTRICT")
          .onUpdate("RESTRICT");
      })
    //   .createTable("step_ingredients", (table) => {
    //     table.increments("step_ingredient_id");
    //     table.float("quantity").notNullable();
    //     table
    //       .integer("step_id")
    //       .unsigned()
    //       .notNullable()
    //       .references("step_id")
    //       .inTable("steps")
    //       .onDelete("RESTRICT")
    //       .onUpdate("RESTRICT");
    //     table
    //       .integer("ingredient_id")
    //       .unsigned()
    //       .notNullable()
    //       .references("ingredient_id")
    //       .inTable("ingredients")
    //       .onDelete("RESTRICT")
    //       .onUpdate("RESTRICT");
    //   });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema
      .dropTableIfExists("step_ingredients")
      .dropTableIfExists("steps")
      .dropTableIfExists("recipes")
      .dropTableIfExists("ingredients");
  };