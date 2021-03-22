import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import DellAnalyzer from './dellAnalyzer'

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string
}
class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json')

  private async getRawHtml() {
    const res = await superagent.get(this.url)
    return res.text
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  private async initSpiderProcss() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcss()
  }
}

export default Crowller
