"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _movies = _interopRequireDefault(require("./api/movies"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

require("./db");

var _expressSession = _interopRequireDefault(require("express-session"));

var _authenticate = _interopRequireDefault(require("./authenticate"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _seedData = require("./seedData");

var _users = _interopRequireDefault(require("./api/users"));

var _upcomingMovies = _interopRequireDefault(require("./api/upcomingMovies"));

var _nowplayingMovies = _interopRequireDefault(require("./api/nowplayingMovies"));

var _people = _interopRequireDefault(require("./api/people"));

_dotenv["default"].config();

if (process.env.NODE_ENV === 'test') {
  _loglevel["default"].setLevel('warn');
} else {
  _loglevel["default"].setLevel('info');
}

if (process.env.SEED_DB === 'true') {
  (0, _seedData.loadUsers)();
  (0, _seedData.loadMovies)();
  (0, _seedData.loadUpcomingMovies)();
  (0, _seedData.loadNowplayingMovies)();
  (0, _seedData.loadPeople)();
} // eslint-disable-next-line no-unused-vars


var errHandler = function errHandler(err, req, res, next) {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send("Something went wrong!");
  }

  res.status(500).send("Hey!! You caught the error \uD83D\uDC4D\uD83D\uDC4D, ".concat(err.stack, " "));
};

var app = (0, _express["default"])();
var port = process.env.PORT; // app.use(session({
//   secret: 'ilikecake',
//   resave: true,
//   saveUninitialized: true
// }));

app.use(_authenticate["default"].initialize());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded());
app.use(_express["default"]["static"]('public'));
app.use('/api/users', _users["default"]);
app.use('/api/movies', _authenticate["default"].authenticate('jwt', {
  session: false
}), _movies["default"]);
app.use('/api/upcomingMovies', _authenticate["default"].authenticate('jwt', {
  session: false
}), _upcomingMovies["default"]);
app.use('/api/nowplayingMovies', _authenticate["default"].authenticate('jwt', {
  session: false
}), _nowplayingMovies["default"]);
app.use('/api/people', _authenticate["default"].authenticate('jwt', {
  session: false
}), _people["default"]);
app.use(errHandler);
var server = app.listen(port, function () {
  _loglevel["default"].info("Server running at ".concat(port));
});
module.exports = server;