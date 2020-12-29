"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _tmdbApi = require("../tmdb-api");

var _movieModel = _interopRequireDefault(require("./movieModel"));

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  _movieModel["default"].find().then(function (movies) {
    return res.status(200).send(movies);
  })["catch"](next);
});
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);

  _movieModel["default"].findByMovieDBId(id).then(function (movie) {
    return res.status(200).send(movie);
  })["catch"](next);
}); // eslint-disable-next-line no-unused-vars

router.get('/:id/reviews', function (req, res, next) {
  var id = parseInt(req.params.id);
  (0, _tmdbApi.getMovieReviews)(id).then(function (reviews) {
    return res.status(200).send(reviews);
  })["catch"](function (error) {
    return next(error);
  });
});
var _default = router;
exports["default"] = _default;