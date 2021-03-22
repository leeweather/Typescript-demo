"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItem = $('.course-item');
        var courseInfos = [];
        courseItem.map(function (i, v) {
            var descs = $(v).find('.course-desc');
            var title = descs.eq(0).text();
            courseInfos.push({ title: title });
        });
        var resultInfo = {
            time: new Date().getTime(),
            data: courseInfos,
        };
        return resultInfo;
    };
    DellAnalyzer.prototype.generateJsonContent = function (courseResult, filePath) {
        var content = {};
        if (fs_1.default.existsSync(filePath)) {
            content = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        content[courseResult.time] = courseResult.data;
        return content;
    };
    DellAnalyzer.prototype.analyzer = function (html, filePath) {
        var courseResult = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    DellAnalyzer.getAnalyzer = function () {
        if (!this.instance) {
            this.instance = new DellAnalyzer();
        }
        return this.instance;
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
console.log(222);
