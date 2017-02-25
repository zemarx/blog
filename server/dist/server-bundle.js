/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
    database: {
        url: 'mongodb://zemarx:3klpdMkelk#@ds011492.mlab.com:11492/zapp'
    },
    auth: {
        secret: 'E7CLnuAqpkayBTQz-EhISv3gKfiLe42eI0CbSSLjZ5jANtsAxG1KL7_A55QuUAyU',
        audience: '1RKVElCxIXd2SXUrtFNVSplPqm10SOl5'
    }
};

module.exports = config;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winston = __webpack_require__(18);

var tsFormat = function tsFormat() {
    return new Date().toLocaleTimeString();
};
var logger = new winston.Logger({
    transports: [
    // colorize the output to the console
    new winston.transports.Console({
        timestamp: tsFormat,
        colorize: true
    })]
});

logger.level = 'debug';

module.exports = logger;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("sanitize-html");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _comment = __webpack_require__(14);

var CommentController = _interopRequireWildcard(_comment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// Get all comments for particular post
router.route('/comments').get(CommentController.getComments);

// Add one comment for particular post
router.route('/comments').post(CommentController.addComment);

// Delete a post by its id
router.route('/comments').delete(CommentController.deleteComment);

exports.default = router;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(1);

var _post = __webpack_require__(15);

var PostController = _interopRequireWildcard(_post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();
var config = __webpack_require__(2);

var jwt = __webpack_require__(3);
var authCheck = jwt({
    secret: new Buffer(config.auth.secret, 'base64'),
    audience: config.auth.audience
});

//--------TODO: ALL THE POSSIBLE REQUESTS HERE UNDER THIS COMMENT--------

// GET:    http://localhost:3000/api/posts       ---> Get all posts
// POST:   http://localhost:3000/api/posts       ---> Add one post
// PUT:    http://localhost:3000/api/posts/:_id  ---> Update one post by id
// GET:    http://localhost:3000/api/posts/:_id  ---> Get one post by id
// DELETE: http://localhost:3000/api/posts/:_id  ---> Delete one post by id

// Get all posts
router.route('/posts').get(PostController.getAllPosts); // authCheck as first parameter to get()

// Add new post
router.route('/posts').post(PostController.addPost);

// Update post
router.route('/posts/:_id').put(PostController.updatePost);

// Get one post by its id
router.route('/posts/:_id').get(PostController.getPost);

// Delete one post by its id
router.route('/posts/:_id').delete(PostController.deletePost);

exports.default = router;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("auth0");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addComment = addComment;
exports.getComments = getComments;
exports.deleteComment = deleteComment;

var _comment = __webpack_require__(16);

var _comment2 = _interopRequireDefault(_comment);

var _logger = __webpack_require__(6);

var _logger2 = _interopRequireDefault(_logger);

var _fullUrl = __webpack_require__(5);

var _fullUrl2 = _interopRequireDefault(_fullUrl);

var _sanitizeHtml = __webpack_require__(7);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeTree = __webpack_require__(17);

var ObjectId = __webpack_require__(0).ObjectID;

// Save comment with particular post id
function addComment(req, res) {
    _logger2.default.debug('Requested to save comment: ' + req.body.comment + ' from : ' + (0, _fullUrl2.default)(req));

    var postId = (0, _sanitizeHtml2.default)(req.body.comment.postId);
    var parentId = (0, _sanitizeHtml2.default)(req.body.comment.parentId);
    var authorName = (0, _sanitizeHtml2.default)(req.body.comment.authorName);
    var content = (0, _sanitizeHtml2.default)(req.body.comment.content);

    req.db.collection('comments').insert({
        _id: new ObjectId(),
        postId: postId !== '' && postId !== null && postId !== 'null' ? new ObjectId(postId) : null,
        parentId: parentId !== '' || parentId !== null || parentId !== 'null' ? parentId : null,
        authorName: authorName,
        content: content,
        dateAdded: new Date(),
        children: []
    }, function (err, results) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json(results.ops[0]);
    });
}

// Get all comments for particular post
// Mongo query returns a flat tree, so using function makeTree(), comment tree is constructed
function getComments(req, res) {
    _logger2.default.info('Requested all comments from: ' + (0, _fullUrl2.default)(req));
    _logger2.default.debug('Comments postId: ' + req.query.postId);

    req.db.collection('comments').find({ postId: new ObjectId(req.query.postId) }).toArray(function (err, comments) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        var commentTree = makeTree(comments);

        res.json(commentTree);
    });
}

// Delete single comment
function deleteComment(req, res) {
    _logger2.default.info('Requested to delete comment with id: ' + req.params._id + ' from: ' + (0, _fullUrl2.default)(req));
    _logger2.default.debug('Comments postId: ' + req.query.postId);

    //delete comment with property postId above
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllPosts = getAllPosts;
exports.addPost = addPost;
exports.updatePost = updatePost;
exports.getPost = getPost;
exports.deletePost = deletePost;

var _logger = __webpack_require__(6);

var _logger2 = _interopRequireDefault(_logger);

var _fullUrl = __webpack_require__(5);

var _fullUrl2 = _interopRequireDefault(_fullUrl);

var _sanitizeHtml = __webpack_require__(7);

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = __webpack_require__(0).ObjectID;

// import getIdToken from '../utils/parseJwtToken';
// import getUserProfile from '../utils/getUserProfileWithJwtToken';

function getAllPosts(req, res) {
    // getUserProfile(getIdToken(req), (err, response, body) => {});
    // logger.debug(`User profile object: ${JSON.stringify(body, null, 2)}`);

    _logger2.default.info('Requested all posts from: ' + (0, _fullUrl2.default)(req));

    req.db.collection('posts').find({}).toArray(function (err, posts) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json({ posts: posts });
    });
}

function addPost(req, res) {
    if (!req.body.post.content || !req.body.post.title || !req.body.post.authorName) {
        return;
    }

    req.db.collection('posts').insert({
        _id: new ObjectId(),
        authorName: (0, _sanitizeHtml2.default)(req.body.post.authorName),
        title: (0, _sanitizeHtml2.default)(req.body.post.title),
        content: (0, _sanitizeHtml2.default)(req.body.post.content),
        dateAdded: new Date()
    }, function (err, results) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(200);
        res.json({ post: results.ops });
    });
}

function updatePost(req, res) {
    _logger2.default.info('Requsted to update one post with id: ' + req.params._id + ' from: ' + (0, _fullUrl2.default)(req));

    if (!req.body.post.content || !req.body.post.title || !req.body.post.authorName) {
        return;
    }

    req.db.collection('posts').findOneAndUpdate({
        _id: new ObjectId(req.params._id)
    }, {
        $set: {
            content: req.body.post.content,
            title: req.body.post.title,
            authorName: req.body.post.authorName
        }
    }, function (err, results) {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200);
        res.send("Post updated successfully");
    });
}

function getPost(req, res) {
    _logger2.default.info('Requested one post with id: ' + req.params._id + ' from: ' + (0, _fullUrl2.default)(req));

    req.db.collection('posts').findOne({ _id: new ObjectId(req.params._id) }, function (err, post) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json({ post: post });
    });
}

function deletePost(req, res) {
    _logger2.default.info('Requested to delete post with id: ' + req.params._id + ' from: ' + (0, _fullUrl2.default)(req));

    //TODO: also delete comments of that post

    req.db.collection('posts').removeOne({ _id: new ObjectId(req.params._id) }, function (err, results) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (results.result.n === 1) {
            res.status(200);
            res.send("Deleted post with id: " + req.params._id + " successfully");
        } else {
            res.status(500);
            res.send("Deletion failed");
        }
    });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(4);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Comment = new Schema({
    _id: { type: _mongoose2.default.Schema.Types.ObjectId, required: true },
    postId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Post' },
    parentId: { type: _mongoose2.default.Schema.Types.ObjectId },
    authorName: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: new Date(), required: true },
    children: []
});

exports.default = _mongoose2.default.model('Comment', Comment);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function makeTree(flat_tree) {
    var nodes = [];
    var completeTree = [];
    var lookupList = {};

    for (var i = 0; i < flat_tree.length; i++) {
        var tmpNode = {
            _id: flat_tree[i]._id,
            postId: flat_tree[i].postId,
            parentId: flat_tree[i].parentId,
            authorName: flat_tree[i].authorName,
            content: flat_tree[i].content,
            dateAdded: flat_tree[i].dateAdded,
            children: []
        };

        lookupList[tmpNode._id] = tmpNode;
        nodes.push(tmpNode);

        if (tmpNode.parentId === null || tmpNode.parentId === '') {
            completeTree.push(tmpNode);
        }
    }

    for (var _i = 0; _i < nodes.length; _i++) {
        var _tmpNode = nodes[_i];

        if (_tmpNode.parentId !== null && _tmpNode.parentId !== '') {
            lookupList[_tmpNode.parentId].children = lookupList[_tmpNode.parentId].children.concat([_tmpNode]);
        }
    }

    return completeTree;
}

module.exports = makeTree;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _post = __webpack_require__(9);

var _post2 = _interopRequireDefault(_post);

var _comment = __webpack_require__(8);

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(1);
var Router = express.Router;
var mongoose = __webpack_require__(4);
var bodyParser = __webpack_require__(11);
var path = __webpack_require__(13);
var jwt = __webpack_require__(3);
var cors = __webpack_require__(12);
var auth0 = __webpack_require__(10);
var mongodb = __webpack_require__(0);
var MongoClient = __webpack_require__(0).MongoClient;
var app = express();
var config = __webpack_require__(2);
var db_url = config.database.url;
var port = process.env.PORT || 3000;

//---------------IMPORT ROUTES--------------------

//----------SETUP DATABASE CONNECTION---------------
var db = void 0;

MongoClient.connect(db_url, function (err, database) {
    if (err) throw err;

    db = database;

    app.listen(port, function () {
        console.log('Server is listening on port: ' + port);
    });
});

app.use(cors());
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ===============app.use(express.static(path.join(__dirname, 'client')))

app.use(express.static('./../client')); //'/' + path.relative(__dirname, '../client')));
app.use('/', express.static('./../client')); //'/' + path.relative(__dirname, '../client')));

// app.use(express.static('/Users/lagorithm/workspace/angular_projects/blog_final/client'));
// app.use('/', express.static('/Users/lagorithm/workspace/angular_projects/blog_final/client'));

app.use('/api', _post2.default);
app.use('/api', _comment2.default);

var htmlIndexRouter = new Router();

htmlIndexRouter.get('*', function (req, res) {
    res.sendFile('index.html', { root: '/Users/lagorithm/tmp/blog_webpack/src/index.html' });
});

app.use(htmlIndexRouter);

/***/ })
/******/ ]);