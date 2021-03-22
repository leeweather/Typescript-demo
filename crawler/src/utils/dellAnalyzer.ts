import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { Analyzer } from './crowller'

interface CourseInfo {
  title: string
}

interface CourseResult {
  time: number
  data: CourseInfo[]
}

interface content {
  [propName: number]: CourseInfo[]
}

export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer

  getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItem = $('.course-item')
    const courseInfos: CourseInfo[] = []
    courseItem.map((i, v) => {
      const descs = $(v).find('.course-desc')
      const title = descs.eq(0).text()
      courseInfos.push({ title })
    })
    const resultInfo = {
      time: new Date().getTime(),
      data: courseInfos,
    }
    return resultInfo
  }

  private generateJsonContent(courseResult: CourseResult, filePath: string) {
    let content: content = {}
    if (fs.existsSync(filePath)) {
      content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    content[courseResult.time] = courseResult.data
    return content
  }

  public analyzer(html: string, filePath: string) {
    const courseResult = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseResult, filePath)
    return JSON.stringify(fileContent)
  }

  private constructor() {}

  static getAnalyzer() {
    if (!this.instance) {
      this.instance = new DellAnalyzer()
    }
    return this.instance
  }
}

console.log(222)
