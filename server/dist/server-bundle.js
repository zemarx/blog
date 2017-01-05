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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _post = __webpack_require__(1);

	var _post2 = _interopRequireDefault(_post);

	var _comment = __webpack_require__(11);

	var _comment2 = _interopRequireDefault(_comment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(2);
	var mongoose = __webpack_require__(14);
	var bodyParser = __webpack_require__(15);
	var path = __webpack_require__(16);
	var jwt = __webpack_require__(10);
	var cors = __webpack_require__(17);
	var auth0 = __webpack_require__(18);
	var mongodb = __webpack_require__(8);
	var MongoClient = __webpack_require__(8).MongoClient;
	var app = express();
	var config = __webpack_require__(9);
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

	console.log(path.relative(__dirname, '../client'));

	// app.use(express.static('/Users/lagorithm/workspace/angular_projects/blog_final/client'));
	// app.use('/', express.static('/Users/lagorithm/workspace/angular_projects/blog_final/client'));

	app.use('/api', _post2.default);
	app.use('/api', _comment2.default);
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _express = __webpack_require__(2);

	var _post = __webpack_require__(3);

	var PostController = _interopRequireWildcard(_post);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();
	var config = __webpack_require__(9);

	var jwt = __webpack_require__(10);
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getAllPosts = getAllPosts;
	exports.addPost = addPost;
	exports.updatePost = updatePost;
	exports.getPost = getPost;
	exports.deletePost = deletePost;

	var _logger = __webpack_require__(4);

	var _logger2 = _interopRequireDefault(_logger);

	var _fullUrl = __webpack_require__(6);

	var _fullUrl2 = _interopRequireDefault(_fullUrl);

	var _sanitizeHtml = __webpack_require__(7);

	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ObjectId = __webpack_require__(8).ObjectID;

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var winston = __webpack_require__(5);

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (req) {
	    return req.protocol + '://' + req.get('host') + req.originalUrl;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

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

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("express-jwt");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _comment = __webpack_require__(12);

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addComment = addComment;
	exports.getComments = getComments;
	exports.deleteComment = deleteComment;

	var _comment = __webpack_require__(13);

	var _comment2 = _interopRequireDefault(_comment);

	var _logger = __webpack_require__(4);

	var _logger2 = _interopRequireDefault(_logger);

	var _fullUrl = __webpack_require__(6);

	var _fullUrl2 = _interopRequireDefault(_fullUrl);

	var _sanitizeHtml = __webpack_require__(7);

	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ObjectId = __webpack_require__(8).ObjectID;

	// Save comment with particular post id
	function addComment(req, res) {
	    _logger2.default.debug('Requested to save comment: ' + req.body.comment + ' from : ' + (0, _fullUrl2.default)(req));
	    // logger.debug(`Comments postId: ${req.query.postId}`);

	    var postId = (0, _sanitizeHtml2.default)(req.body.comment.postId);
	    var parentCommentId = (0, _sanitizeHtml2.default)(req.body.comment.parentCommentId);
	    var authorName = (0, _sanitizeHtml2.default)(req.body.comment.authorName);
	    var content = (0, _sanitizeHtml2.default)(req.body.comment.content);

	    req.db.collection('comments').insert({
	        _id: new ObjectId(),
	        postId: postId ? new ObjectId(postId) : null,
	        parentCommentId: parentCommentId == "null" || parentCommentId == null ? null : parentCommentId,
	        authorName: authorName,
	        content: content,
	        dateAdded: new Date()
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
	function getComments(req, res) {
	    _logger2.default.info('Requested all comments from: ' + (0, _fullUrl2.default)(req));
	    _logger2.default.debug('Comments postId: ' + req.query.postId);

	    var allComments = new Array();
	    var commentsChecked = 0;
	    var commentsLength = 0;

	    function checkCommentResponses() {
	        ++commentsChecked;
	        if (commentsChecked === commentsLength) {
	            res.json(allComments);
	        }
	    }

	    _comment2.default.find({ postId: req.query.postId }, function (err, comments) {
	        if (err) {
	            return;
	            //TODO: proper error
	        }

	        commentsLength = comments.length;

	        comments.forEach(function (comment) {
	            console.log(comment._id);
	            _comment2.default.find({ parentCommentId: comment._id }, function (err, replies) {
	                if (err) {
	                    return;
	                    //TODO: proper error
	                }

	                if (replies.length > 0) {
	                    console.log(replies);
	                    comment.children = replies;
	                }

	                allComments.push(comment);

	                checkCommentResponses();
	            });
	        });
	    });
	}

	// Delete single comment
	function deleteComment(req, res) {
	    _logger2.default.info('Requested to delete comment with id: ' + req.params._id + ' from: ' + (0, _fullUrl2.default)(req));
	    _logger2.default.debug('Comments postId: ' + req.query.postId);

	    //delete comment with property postId above
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(14);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	var Comment = new Schema({
	    _id: { type: _mongoose2.default.Schema.Types.ObjectId, required: true },
	    postId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Post' },
	    parentCommentId: { type: _mongoose2.default.Schema.Types.ObjectId },
	    children: [],
	    authorName: { type: 'String', required: true },
	    content: { type: 'String', required: true },
	    dateAdded: { type: 'Date', default: new Date(), required: true }
	});

	exports.default = _mongoose2.default.model('Comment', Comment);

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("auth0");

/***/ }
/******/ ]);