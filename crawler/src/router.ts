import { Router, Request, Response, NextFunction } from 'express'
import Crowller from './utils/crowller'
import DellAnalyzer from './utils/dellAnalyzer'
import fs from 'fs'
import path from 'path'
import { getResponseData } from './utils/util'

const router = Router()

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
    <html>
      <body>
        <a href="/getData">爬取内容</a>
        <a href="/showData">展示内容</a>
        <a href="/logout">退出</a>
      </body>
    </html>
  `)
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
          <input type="password" name="password">
          <button>登录</button>
          </form>
        </body>
      </html>
    `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  console.log(req.body)
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.json(getResponseData(false, '重复登录'))
  } else {
    if (password === '123' && req.session) {
      req.session.login = true
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(false, '登录失败'))
    }
  }
})

router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
  const dellAnalyzer = DellAnalyzer.getAnalyzer()
  const url = 'http://www.dell-lee.com/'
  new Crowller(url, dellAnalyzer)
  res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const result = fs.readFileSync(position, 'utf-8')
    res.json(JSON.parse(result))
  } catch (error) {
    res.json(getResponseData(false, '数据不存在'))
  }
})

export default router
