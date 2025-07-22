import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("costumers", (table) => {
        table.integer("id").primary(),
            table.text("name").notNullable(),
            table.text("email").notNullable(),
            table.timestamp("cadastred_at").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("costumers")
}

