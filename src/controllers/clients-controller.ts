import { knexInstance } from '@/database/knex'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

class ClientsController {

    private idSchema = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'ID must be a number' })

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { email } = request.query
            const clients = await knexInstance<ClientsTypes>("clients")
                .select("*")
                .whereLike('email', `%${email ?? ""}%`)
            response.json(clients)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().min(2).max(80),
                email: z.string().trim().email({ message: "Invalid email" })
            })
            const { name, email } = bodySchema.parse(request.body)
            await knexInstance<ClientsTypes>("clients").insert({ name, email })
            return response.status(201).json({ name, email })
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.idSchema.parse(request.params.id)


            const bodySchema = z.object({
                email: z.string().trim().email({ message: "Invalid Email" })
            })

            const { email } = bodySchema.parse(request.body)

            const client = await knexInstance<ClientsTypes>("clients")
                .select()
                .where({ id })
                .first()

            if (!client) {
                throw new AppError('Client not found')
            }

            await knexInstance<ClientsTypes>("clients")
                .update({ email })
                .where({ id })
            return response.status(200).json({ message: 'The email has been updated' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = this.idSchema
                .parse(request.params.id)

            const client = await knexInstance<ClientsTypes>("clients")
                .select()
                .where({ id })
                .first()

            if (!client) {
                throw new AppError('Client not found')
            }

            await knexInstance<ClientsTypes>("clients")
                .delete()
                .where({ id })

            return response.json('Client has been deleted!')
        } catch (error) {
            next(error)
        }
    }
}

export { ClientsController }