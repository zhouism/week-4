
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('milestones', function(table) {
            table.increments("id");
            table.string("description");
            table.date("date_archieved");
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
        knex.schema.dropTable('milestones')
  ])
};
