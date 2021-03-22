import express, { Request, Response, NextFunction } from 'express'
import router from './router'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cookieSession({
    name: 'session',
    keys: ['teacher Webb'],
    maxAge: 24 * 60 * 60 * 1000,
  })
)

// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.teacherName = 'webb'
//   next()
// })

app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})
