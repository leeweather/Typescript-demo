export class Repos {
  name: string
  size: string
  language: string
  description: string

  constructor(res: any) {
    this.name = res.name
    this.size = res.size
    this.language = res.language
    this.description = res.description
  }
}
