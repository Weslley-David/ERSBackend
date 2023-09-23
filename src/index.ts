import express from 'express'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'
import { AcessDeniedError, DatabaseError, InteralServerError, RequestError } from './errors'
import { Prisma } from '@prisma/client'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ "working": "fine" })
})

app.get('/error', (req: Request, res: Response) => {
    throw new InteralServerError("Error testado");
})

app.use(routes)

app.listen(port, () => {
    console.log(`༼ つ ╹ ╹ ༽つ http://localhost:${port}`)
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {//, 
    if (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                "msg": "Database Error."
            })
        } else if (error instanceof InteralServerError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })
        } else if (error instanceof AcessDeniedError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })


        } else if (error instanceof RequestError) {
            res.status(error.statusCode).json({
                "msg": error.message,
                "errors": error.errors.array()
            })
        } else if (error instanceof DatabaseError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })
        }

        else {
            console.log('\n Error middleware ʕノ•ᴥ•ʔノ ︵ ┻━┻\n', error)
            return res.status(500).json({ "error": "could not fetch data" })
        }
    }
}) 