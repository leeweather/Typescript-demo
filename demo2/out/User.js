"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(res) {
        this.repos = [];
        this.login = res.login;
        this.bio = res.bio;
        this.name = res.name;
        this.avatar_url = res.avatar_url;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map