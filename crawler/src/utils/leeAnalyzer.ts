import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { Analyzer } from './crowller'

export default class LeeAnalyzer implements Analyzer {
  public analyzer(html: string, filePath: string) {
    return html
  }
}
