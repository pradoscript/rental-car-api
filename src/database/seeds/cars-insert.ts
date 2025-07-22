import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        {
            model: "Corolla",
            brand: "Toyota",
            year: 2021,
            daily_price: 85.0,
            insurance: 20.0
        },
        {
            model: "Civic",
            brand: "Honda",
            year: 2020,
            daily_price: 80.0,
            insurance: 18.0
        },
        {
            model: "Golf",
            brand: "Volkswagen",
            year: 2019,
            daily_price: 75.0,
            insurance: 17.0
        },
        {
            model: "Focus",
            brand: "Ford",
            year: 2018,
            daily_price: 70.0,
            insurance: 16.0
        },
        {
            model: "Elantra",
            brand: "Hyundai",
            year: 2022,
            daily_price: 78.0,
            insurance: 19.0
        },
        {
            model: "Sentra",
            brand: "Nissan",
            year: 2021,
            daily_price: 76.0,
            insurance: 18.0
        },
        {
            model: "Yaris",
            brand: "Toyota",
            year: 2020,
            daily_price: 65.0,
            insurance: 15.0
        }
    ]);
};
