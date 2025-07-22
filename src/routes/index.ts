import { Router } from 'express'
import { costumersRoutes } from './costumers-routes'
import { carRoutes } from './cars-routes'
import { rentalRoutes } from './rentals-routes'

const routes = Router()

routes.use("/costumers", costumersRoutes)
routes.use("/cars", carRoutes)
routes.use("/rentals", rentalRoutes)

export { routes }