import { Router } from 'express'
import { costumersRoutes } from './costumers-routes'
import { carRoutes } from './cars-routes'

const routes = Router()

routes.use("/costumers", costumersRoutes)
routes.use("/cars", carRoutes)

export { routes }