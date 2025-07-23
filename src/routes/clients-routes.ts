import { ClientsController } from '@/controllers/clients-controller'
import { Router } from 'express'

const clientsRoutes = Router()
const clientsController = new ClientsController()

clientsRoutes.get("/", clientsController.index)
clientsRoutes.post("/", clientsController.create)
clientsRoutes.patch("/:id", clientsController.update.bind(clientsController))


export { clientsRoutes }