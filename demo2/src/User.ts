import { Repos } from './Repos'

export class User {
  login: string
  bio: string
  name: string
  avatar_url: string
  repos: Repos[] = []
  constructor(res: any) {
    this.login = res.login
    this.bio = res.bio
    this.name = res.name
    this.avatar_url = res.avatar_url
  }
}
