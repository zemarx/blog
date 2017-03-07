'use strict';
exports.__esModule = true;
var Koa = require("koa");
var post_routes_1 = require("./routes/post.routes");
var comment_routes_1 = require("./routes/comment.routes");
var config_1 = require("./config/config");
var database_service_1 = require("./services/database.service");
var path = require('path');
var serve = require('koa-static');
var send = require('koa-send');
var cors = require('koa-cors');
var bodyparser = require('koa-bodyparser');
var databaseService = new database_service_1["default"]();
var app = new Koa();
app.use(cors());
app.use(bodyparser());
app.use(post_routes_1["default"].routes());
app.use(comment_routes_1["default"].routes());
if (process.env.NODE_ENV === 'production') {
    console.log('Starting in production');
    app.use(serve(path.resolve(__dirname, './../../blog_final/client/dist')));
    app.use(function (ctx, next) {
        return send(ctx, '/index.html', { root: path.resolve(__dirname, './../../blog_final/client/dist') });
    });
}
databaseService.connect(config_1["default"].db.url)
    .then(function () {
    app.listen(config_1["default"].port, function () { return console.log("Started listening on port " + config_1["default"].port); });
})["catch"](function (err) { return console.log(err); });
