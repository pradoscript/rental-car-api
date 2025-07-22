import { CarController } from '@/controllers/cars-controllers'
import { Router } from 'express'

const carRoutes = Router()
const carController = new CarController()

carRoutes.get("/", carController.index)
carRoutes.post("/", carController.create)
carRoutes.patch("/:id", carController.update)
carRoutes.delete("/:id", carController.remove)


export { carRoutes }