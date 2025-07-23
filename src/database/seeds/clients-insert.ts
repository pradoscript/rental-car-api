import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("clients").del();

    // Inserts seed entries
    await knex("clients").insert([
        { name: "João Prado", email: "joao@email.com" },
        { name: "Vitor Almeida", email: "vitor@email.com" },
        { name: "Vitoria Shutz", email: "vitoria@email.com" },
        { name: "Felipe Guerra", email: "felipe@email.com" },
        { name: "Pedro Madeira", email: "pedro@email.com" },
    ]);
};
