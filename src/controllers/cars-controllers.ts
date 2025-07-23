import { knexInstance } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from 'zod'


class CarController {

    idSchema = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' })

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { model } = request.query
            const cars = await knexInstance<CarTypes>("cars")
                .select()
                .whereLike("model", `%${model ?? ""}%`)
            return response.status(200).json(cars)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                model: z.string().min(2),
                brand: z.string().min(2),
                year: z.number(),
                daily_price: z.number().positive(),
                insurance: z.number().positive(),
            })
            const { model, brand, year, daily_price, insurance } = bodySchema.parse(request.body)
            await knexInstance<CarTypes>("cars").insert({ model, brand, year, daily_price, insurance })
            return response.status(201).json({ model, brand, year, daily_price, insurance })
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.idSchema.parse(request.params.id)

            const bodySchema = z.object({
                daily_price: z.number(),
                insurance: z.number()
            })

            const { daily_price, insurance } = bodySchema.parse(request.body)

            const car = await knexInstance<CarTypes>("cars")
                .select()
                .where({ id })
                .first()

            if (!car) {
                throw new AppError('Car not found')
            }

            await knexInstance<CarTypes>("cars")
                .update({ daily_price, insurance })
                .where({ id })
            return response.status(200).json({ message: "The price has been updated" })
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.idSchema.parse(request.params.id)

            const car = await knexInstance<CarTypes>("cars")
                .select()
                .where({ id })
                .first()

            if (!car) {
                throw new AppError('Car not found')
            }

            await knexInstance<CarTypes>("cars").delete().where({ id })
            return response.json({ message: `The car has been deleted` })
        } catch (error) {
            next(error)
        }
    }
}

export { CarController }