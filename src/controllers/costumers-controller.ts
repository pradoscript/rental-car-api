import { knexInstance } from '@/database/knex'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

class CostumersController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { email } = request.query
            const costumers = await knexInstance<CostumerTypes>("costumers")
                .select("*")
                .whereLike('email', `%${email ?? ""}%`)
            response.json(costumers)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string(),
                email: z.string()
            })
            const { name, email } = bodySchema.parse(request.body)
            await knexInstance<CostumerTypes>("costumers").insert({ name, email })
            return response.status(201).json({ name, email })
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: 'ID must be a number' })
                .parse(request.params.id)

            const bodySchema = z.object({
                email: z.string().trim().email({ message: "Invalid Email" })
            })

            const { email } = bodySchema.parse(request.body)
            await knexInstance<CostumerTypes>("costumers")
                .update({ email })
                .where({ id })
            return response.status(200).json({ email })
        } catch (error) {
            next(error)
        }
    }
}

export { CostumersController }