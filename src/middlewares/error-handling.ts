import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandling(err: Error, request: Request, response: Response, next: NextFunction) {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    if (err instanceof ZodError) {
        return response.status(400).json({
            message: err.message,
            issues: err.format()
        })
    }

    return response.status(500).json({
        message: 'Internal Server Error'
    })

}