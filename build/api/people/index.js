"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _peopleModel = _interopRequireDefault(require("./peopleModel"));

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
var _default = router;
exports["default"] = _default;