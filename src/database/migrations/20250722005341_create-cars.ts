import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("cars", (table) => {
        table.integer("id").primary()
        table.text("model").notNullable()
        table.text("brand").notNullable()
        table.integer("year").notNullable()
        table.decimal("daily_price").notNullable()
        table.decimal("insurance").notNullable()
        table.boolean("available").defaultTo(true).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("cars")
}

