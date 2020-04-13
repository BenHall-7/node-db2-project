exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.text("vin").notNullable().unique();
    tbl.text("make").notNullable();
    tbl.text("model").notNullable();
    tbl.float("mileage").notNullable();

    tbl.text("transmission").nullable().defaultTo(null);
    tbl.text("status").nullable().defaultTo(null);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
