"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['teacher Webb'],
    maxAge: 24 * 60 * 60 * 1000,
}));
// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.teacherName = 'webb'
//   next()
// })
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});
