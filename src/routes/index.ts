import { Router } from 'express'
import { costumersRoutes } from './costumers-routes'

const routes = Router()

routes.use("/costumers", costumersRoutes)

export { routes }