"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var UpcomingSchema = new Schema({
  adult: {
    type: Boolean
  },
  id: {
    type: Number,
    required: true
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
  production_countries: [{
    iso_3166_1: {
      type: String
    },
    name: {
      type: String
    }
  }],
  runtime: {
    type: Number
  },
  spoken_languages: [{
    iso_639_1: {
      type: String
    },
    name: {
      type: String
    }
  }],
  status: {
    type: String
  },
  tagline: {
    type: String
  }
});

UpcomingSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({
    id: id
  });
};

var _default = _mongoose["default"].model('Upcoming', UpcomingSchema);

exports["default"] = _default;