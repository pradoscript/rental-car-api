import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("rentals", (table) => {
        table.integer("id").primary()
        table.integer("client_id").notNullable().references("id").inTable("costumers")
        table.integer("car_id").notNullable().references("id").inTable("cars")
        table.timestamp("start_date").notNullable()
        table.timestamp("end_date").notNullable()
        table.decimal("total_price").notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("rentals")
}

