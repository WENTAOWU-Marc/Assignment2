"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var PeopleSchema = new Schema({
  adult: {
    type: Boolean
  },
  name: {
    type: String
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  profile_path: {
    type: String
  },
  poster_path: {
    type: String
  },
  overview: {
    type: String
  },
  release_date: {
    type: String
  },
  original_title: {
    type: String
  },
  genre_ids: [{
    type: Number
  }],
  media_type: {
    type: String
  },
  original_language: {
    type: String
  },
  title: {
    type: String
  },
  backdrop_path: {
    type: String
  },
  popularity: {
    type: Number
  },
  vote_count: {
    type: Number
  },
  video: {
    type: Boolean
  },
  vote_average: {
    type: Number
  },
  first_air_date: {
    type: String
  },
  origin_country: [{
    type: String
  }],
  original_name: {
    type: String
  },
  total_results: {
    type: Number
  },
  total_pages: {
    type: Number
  }
});

PeopleSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({
    id: id
  });
};

var _default = _mongoose["default"].model('People', PeopleSchema);

exports["default"] = _default;