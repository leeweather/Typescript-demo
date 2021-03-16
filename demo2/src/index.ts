import { GithubApiServices } from './GithubApiService'
import { User } from './User'
import { Repos } from './Repos'
import * as lodash from 'lodash'
import express from 'express'
import url from 'url'

const app = express()

let MyService = new GithubApiServices()

app.get('/github', (req, res) => {
  debugger
  let userName: any = url.parse(req.url, true).query.username
  MyService.getUserInfo(userName, (user: User) => {
    MyService.getReops(user.login, (repos: Repos[]) => {
      let sortRepos = lodash.sortBy(repos, [(repos: Repos) => -repos.size])
      user.repos = sortRepos
      res.send(user)
    })
  })
})

app.listen(3000, () => {
  console.log('serve is running on port 3000')
})
