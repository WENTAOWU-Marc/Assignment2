"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _peopleModel = _interopRequireDefault(require("./peopleModel"));

var _tmdbApi = require("../tmdb-api");

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  _peopleModel["default"].find().then(function (people) {
    return res.status(200).send(people);
  })["catch"](next);
});
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id);

  _peopleModel["default"].findByMovieDBId(id).then(function (people) {
    return res.status(200).send(people);
  })["catch"](next);
});
router.get('/:id/credits', function (req, res, next) {
  var id = parseInt(req.params.id);
  (0, _tmdbApi.getCombinedCredits)(id).then(function (credits) {
    return res.status(200).send(credits);
  })["catch"](function (error) {
    return next(error);
  });
});
var _default = router;
exports["default"] = _default;