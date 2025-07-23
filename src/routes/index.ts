import { Router } from 'express'
import { clientsRoutes } from './clients-routes'
import { carRoutes } from './cars-routes'
import { rentalRoutes } from './rentals-routes'

const routes = Router()

routes.use("/clients", clientsRoutes)
routes.use("/cars", carRoutes)
routes.use("/rentals", rentalRoutes)

export { routes }