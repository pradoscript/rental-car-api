import { CarsController } from '@/controllers/cars-controllers'
import { Router } from 'express'

const carRoutes = Router()
const carController = new CarsController()

carRoutes.get("/", carController.index)
carRoutes.post("/", carController.create)
carRoutes.patch("/:id", carController.update.bind(carController))
carRoutes.delete("/:id", carController.remove.bind(carController))


export { carRoutes }    