import { knexInstance } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";
import { z } from 'zod'

class RentalsController {

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const rentals = await knexInstance<RentalTypes>("rentals")
                .select("rentals.id", "clients.name", "cars.model", "rentals.start_date", "rentals.end_date", "total_price AS price")
                .join("clients", "clients.id", "rentals.client_id")
                .join("cars", "cars.id", "rentals.car_id")
            return response.status(200).json(rentals)
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform(string => Number(string))
                .refine(value => !isNaN(value), { message: 'The ID must be a number' })
                .parse(request.params.id)

            const rentalFlag = await knexInstance<RentalTypes>("rentals")
                .select()
                .where({ id })
                .first()

            if (!rentalFlag) {
                throw new AppError('Rental not found')
            }

            const rental = await knexInstance<RentalTypes>("rentals")
                .select("rentals.id", "clients.name", "cars.model", "rentals.start_date", "rentals.end_date", "total_price AS price")
                .where("rentals.id", id)
                .join("clients", "clients.id", "rentals.client_id")
                .join("cars", "cars.id", "rentals.car_id")
                .first()
            return response.status(200).json(rental)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                client_id: z.number(),
                car_id: z.number(),
                start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
                    message: "Invalid date format",
                }),
                end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
                    message: "Invalid date format",
                }),
            })

            const { client_id, car_id, start_date, end_date } = bodySchema.parse(request.body)

            const car = await knexInstance<CarTypes>("cars").select().where({ id: car_id }).first()

            if (!car) {
                throw new AppError('Car not found')
            }

            if (!car.available) {
                throw new AppError('Car already taken')
            }

            await knexInstance<CarTypes>("cars").update({ available: false }).where({ id: car_id })

            const startDate = dayjs(start_date).startOf('day')
            const endDate = dayjs(end_date).startOf('day')
            const diffInDays = endDate.diff(startDate, "day")

            if (diffInDays <= 0) {
                throw new AppError('The difference between the dates is negative')
            }

            const total_price = ((diffInDays * Number(car?.daily_price)) + Number(car?.insurance))

            await knexInstance<RentalTypes>("rentals").insert({
                client_id,
                car_id,
                start_date: startDate.format("DD-MM-YYYY"),
                end_date: endDate.format("DD-MM-YYYY"),
                total_price
            });

            return response.status(201).json({ message: "Rental created successfully" });

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform(string => Number(string))
                .refine(value => !isNaN(value), { message: 'The ID must be a number' })
                .parse(request.params.id)

            const rentalFlag = await knexInstance<RentalTypes>("rentals")
                .select()
                .where({ id })

            if (!rentalFlag) {
                throw new AppError('Rental not found')
            }

            const carId = await knexInstance<RentalTypes>("rentals")
                .select("car_id")
                .where({ id })
                .first()

            await knexInstance<RentalTypes>("rentals")
                .delete()
                .where({ id })

            await knexInstance<CarTypes>("cars")
                .update({ available: true })
                .where({ id: carId?.car_id })

            return response.json({ message: 'The car has been returned' })

        } catch (error) {
            next(error)
        }
    }
}

export { RentalsController }