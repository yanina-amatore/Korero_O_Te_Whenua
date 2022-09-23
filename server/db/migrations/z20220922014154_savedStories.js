exports.up = function (knex) {
  return knex.schema.createTable('saved_stories', (table) => {
    table.increments('id')
    table.integer('story_id').references('stories.id')
    table.integer('user_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('saved_stories')
}
