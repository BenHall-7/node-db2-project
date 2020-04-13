exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.text("vin").primary();
    tbl.text("make").notNullable();
    tbl.text("model").notNullable();
    tbl.float("mileage").notNullable();

    tbl.text("transmission").nullable();
    tbl.text("status").nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
