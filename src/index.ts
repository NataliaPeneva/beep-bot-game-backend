import * as express from 'express'
import * as cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Listening on port ${port}`))

export default app
