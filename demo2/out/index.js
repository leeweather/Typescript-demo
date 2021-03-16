"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var lodash = __importStar(require("lodash"));
var express_1 = __importDefault(require("express"));
var url_1 = __importDefault(require("url"));
var app = express_1.default();
var MyService = new GithubApiService_1.GithubApiServices();
app.get('/github', function (req, res) {
    var userName = url_1.default.parse(req.url, true).query.username;
    MyService.getUserInfo(userName, function (user) {
        MyService.getReops(user.login, function (repos) {
            var sortRepos = lodash.sortBy(repos, [function (repos) { return -repos.size; }]);
            user.repos = sortRepos;
            res.send(user);
        });
    });
});
app.listen(3000, function () {
    console.log('serve is running on port 3000');
});
//# sourceMappingURL=index.js.map