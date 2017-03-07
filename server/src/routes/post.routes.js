'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var Router = require("koa-router");
var post_service_1 = require("../services/post.service");
var postService = new post_service_1["default"]();
var router = new Router({ prefix: '/api' });
// GET:    http://localhost:3000/api/posts       ---> Get all posts
// POST:   http://localhost:3000/api/posts       ---> Add one post
// PUT:    http://localhost:3000/api/posts/:_id  ---> Update one post by id
// GET:    http://localhost:3000/api/posts/:_id  ---> Get one post by id
// DELETE: http://localhost:3000/api/posts/:_id  ---> Delete one post by id
// Get all posts
// Returns object "posts" of type array with all the posts
router.get('/posts', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postService.getAllPosts()];
            case 1:
                posts = _a.sent();
                ctx.body = { posts: posts };
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Add new post
// Retuns created post in response
router.post('/posts', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = ctx;
                return [4 /*yield*/, postService.addNewPost(ctx.request.body.post)];
            case 1:
                _a.body = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update post
router.put('/posts/:_id', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = ctx;
                return [4 /*yield*/, postService.updatePost(ctx.params._id, ctx.request.body.post)];
            case 1:
                _a.body = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get one post by id
router.get('/posts/:_id', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = ctx;
                return [4 /*yield*/, postService.getPost(ctx.params._id)];
            case 1:
                _a.body = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                console.log(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete one post by id
router["delete"]('/posts/:_id', function (ctx, next) {
    try {
        ctx.body = postService.deletePost(ctx.params._id);
    }
    catch (err) {
        console.log(err);
    }
});
exports["default"] = router;
