"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favourites: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Movies'
  }],
  watchList: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Upcomings'
  }]
});

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({
    username: username
  });
};

UserSchema.methods.comparePassword = function (passw, cb) {
  _bcryptNodejs["default"].compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (this.isModified('password') || this.isNew) {
    _bcryptNodejs["default"].genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      _bcryptNodejs["default"].hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;