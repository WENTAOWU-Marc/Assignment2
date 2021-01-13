"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUsers = loadUsers;
exports.loadMovies = loadMovies;
exports.loadUpcomingMovies = loadUpcomingMovies;
exports.loadNowplayingMovies = loadNowplayingMovies;
exports.loadPeople = loadPeople;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModel = _interopRequireDefault(require("../api/users/userModel"));

var _movieModel = _interopRequireDefault(require("../api/movies/movieModel"));

var _upcomingModel = _interopRequireDefault(require("../api/upcomingMovies/upcomingModel"));

var _nowplayingModel = _interopRequireDefault(require("../api/nowplayingMovies/nowplayingModel"));

var _peopleModel = _interopRequireDefault(require("../api/people/peopleModel"));

var _movies = require("./movies.js");

var _tmdbApi = require("../api/tmdb-api");

var users = [{
  'username': 'user1',
  'password': 'test1'
}, {
  'username': 'user2',
  'password': 'test2'
}]; // deletes all user documents in collection and inserts test data

function loadUsers() {
  return _loadUsers.apply(this, arguments);
} // deletes all movies documents in collection and inserts test data


function _loadUsers() {
  _loadUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('load user Data');
            _context.prev = 1;
            _context.next = 4;
            return _userModel["default"].deleteMany();

          case 4:
            _context.next = 6;
            return users.forEach(function (user) {
              return _userModel["default"].create(user);
            });

          case 6:
            console.info("".concat(users.length, " users were successfully stored."));
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.error("failed to Load user Data: ".concat(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _loadUsers.apply(this, arguments);
}

function loadMovies() {
  return _loadMovies.apply(this, arguments);
}

function _loadMovies() {
  _loadMovies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('load seed data'); // console.log(movies.length);

            _context2.prev = 1;
            _context2.next = 4;
            return _movieModel["default"].deleteMany();

          case 4:
            _context2.next = 6;
            return _movieModel["default"].collection.insertMany(_movies.movies);

          case 6:
            console.info("".concat(_movies.movies.length, " Movies were successfully stored."));
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.error("failed to Load movie Data: ".concat(_context2.t0));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _loadMovies.apply(this, arguments);
}

function loadUpcomingMovies() {
  return _loadUpcomingMovies.apply(this, arguments);
}

function _loadUpcomingMovies() {
  _loadUpcomingMovies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('load upcomingmovies');

            try {
              (0, _tmdbApi.getUpcomingMovies)().then( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(res) {
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _upcomingModel["default"].deleteMany();

                        case 2:
                          _context3.next = 4;
                          return _upcomingModel["default"].collection.insertMany(res);

                        case 4:
                          console.info("".concat(res.length, " Upcomingmovies were successfully stored."));

                        case 5:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
            } catch (err) {
              console.error("failed to Load upcomingmovie Data: ".concat(err));
            }

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadUpcomingMovies.apply(this, arguments);
}

function loadNowplayingMovies() {
  return _loadNowplayingMovies.apply(this, arguments);
}

function _loadNowplayingMovies() {
  _loadNowplayingMovies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('load nowplayingmovies');

            try {
              (0, _tmdbApi.getNowPlayingMovies)().then( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(res) {
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _nowplayingModel["default"].deleteMany();

                        case 2:
                          _context5.next = 4;
                          return _nowplayingModel["default"].collection.insertMany(res);

                        case 4:
                          console.info("".concat(res.length, " Nowplayingmovies were successfully stored."));

                        case 5:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            } catch (err) {
              console.error("failed to Load nowplayingmovie Data: ".concat(err));
            }

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _loadNowplayingMovies.apply(this, arguments);
}

function loadPeople() {
  return _loadPeople.apply(this, arguments);
}

function _loadPeople() {
  _loadPeople = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('load nowplayingmovies');

            try {
              (0, _tmdbApi.getActors)().then( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(res) {
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _peopleModel["default"].deleteMany();

                        case 2:
                          _context7.next = 4;
                          return _peopleModel["default"].collection.insertMany(res);

                        case 4:
                          console.info("".concat(res.length, " actors were successfully stored."));

                        case 5:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }());
            } catch (err) {
              console.error("failed to Load actor Data: ".concat(err));
            }

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _loadPeople.apply(this, arguments);
}