import express from 'express'
import { routes } from './routes'
import { errorHandling } from './middlewares/error-handling'

const PORT = 3333
const server = express()

server.use(express.json())

server.use(routes)

server.use(errorHandling)


server.listen(PORT, () => {
    console.log(`Server has been started on http://localhost:${PORT}`)
})