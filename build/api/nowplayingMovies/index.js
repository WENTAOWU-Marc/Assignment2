"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _nowplayingModel = _interopRequireDefault(require("./nowplayingModel"));

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  _nowplayingModel["default"].find().then(function (movies) {
    return res.status(200).send(movies);
  })["catch"](next);
});
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);

  _nowplayingModel["default"].findByMovieDBId(id).then(function (movie) {
    return res.status(200).send(movie);
  })["catch"](next);
});
var _default = router;
exports["default"] = _default;