import { RentalsController } from '@/controllers/rentals-controller'
import { Router } from 'express'

const rentalRoutes = Router()
const rentalsController = new RentalsController()

rentalRoutes.get("/", rentalsController.index)
rentalRoutes.get("/:id", rentalsController.show)
rentalRoutes.post("/", rentalsController.create)
rentalRoutes.delete("/:id", rentalsController.delete)

export { rentalRoutes }