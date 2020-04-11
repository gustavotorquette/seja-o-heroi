
exports.up = function(knex) {
  return knex.schema.createTable('casos', function(table){

    table.increments();
    table.string('title').notNullable();
    table.string('description', 2000).notNullable();


    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');


  });
};

exports.down = function(knex) {
  knex.schema.dropTable('casos');
};
