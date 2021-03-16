import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

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

class Crowller {
  private url = 'http://www.dell-lee.com/'

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

  async getRawHtml() {
    const res = await superagent.get(this.url)
    return res.text
  }

  generateJsonContent(courseResult: CourseResult) {
    const filePath = path.resolve(__dirname, '../data/course.json')
    let content: content = {}
    if (fs.existsSync(filePath)) {
      content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    content[courseResult.time] = courseResult.data
    return content
  }

  async initSpiderProcss() {
    const filePath = path.resolve(__dirname, '../data/course.json')
    const html = await this.getRawHtml()
    const courseResult = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseResult)
    fs.writeFileSync(filePath, JSON.stringify(fileContent))
  }

  constructor() {
    this.initSpiderProcss()
  }
}

const crowller = new Crowller()
