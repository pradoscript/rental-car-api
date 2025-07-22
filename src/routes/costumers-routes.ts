import { CostumersController } from '@/controllers/costumers-controller'
import { Router } from 'express'

const costumersRoutes = Router()
const costumersController = new CostumersController()

costumersRoutes.get("/", costumersController.index)
costumersRoutes.post("/", costumersController.create)
costumersRoutes.patch("/:id", costumersController.update)


export { costumersRoutes }