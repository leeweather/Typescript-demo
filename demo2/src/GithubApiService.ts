import * as request from 'request'
import { User } from './User'
import { Repos } from './Repos'

const options = {
  headers: {
    'User-Agent': 'request',
  },
  json: true,
}

export class GithubApiServices {
  options = {
    UserAgent: 'request',
  }

  getUserInfo(userName: string, cb: (user: User) => void) {
    request.get(
      'https://api.github.com/users/' + userName,
      options,
      (err: any, response: any, body: any) => {
        let user: User = new User(body)
        cb(user)
      }
    )
  }

  getReops(userName: string, cb: (repos: Repos[]) => void) {
    request.get(
      'https://api.github.com/users/' + userName + '/repos',
      options,
      (err: any, response: any, body: any) => {
        let repos: Repos[] = body.map((repo: any) => new Repos(repo))
        cb(repos)
      }
    )
  }
}
