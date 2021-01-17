# Assignment 2 - Web API 

+ This readme file contain both Web and Agile module and the agile module is after the web part.

Name: WENTAO

## Features.
 
 + Feature 1 - get the list of upcoming movies and the information of sigle upcoming movie
 + Feature 2 - get the list of nowplaying movies and the information of sigle nowplaying movie 
 + Feature 3 - get the list of actor and the information of sigle actor
 + Feature 4 - get the list of combined credits of actor
 + Feature 5 - add or delete upcoming movie to the watchlist 

## Installation Requirements

"nodemon": "^2.0.6",
"express": "^4.17.1",
"express-session": "^1.17.1",
"jsonwebtoken": "^8.5.1",
"loglevel": "^1.7.1",
"mongoose": "^5.11.7",
"passport": "^0.4.1",
"passport-jwt": "^4.0.0"

In package.json, the dependency softwares and their version are recorded. 

Then run the code in terminal to install

```bat
npm install
```

## API Configuration

In the .env file, the configuration variables are recorded.

+ TMDB_KEY: the user KEY of TMDB to access to the api 
+ mongoDB: the mongoDB url to get connected with the MongoDB cloud
+ SECRET: the secret key for the JWT authorization

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=TMDBAPIKEY
mongoDB=MongDBURl
SEED_DB=true
SECRET=JWTSECRET
```

## API Design
Give an overview of your web API design, perhaps similar to the following: 

|                                 | GET                                        | POST                       | PUT | DELETE                      |
| ------------------------------- | ------------------------------------------ | -------------------------- | --- | --------------------------- |
| /api/upcomingMovies             | Gets a list of upcomingmovies              | N/A                        | N/A | N/A                         |
| /api/upcomingMovies/{movieid}   | Get a upcomingmovie                        | N/A                        | N/A | N/A                         |
| /api/nowplayingMovies/          | Get a list of nowplayingmovies             | N/A                        | N/A | N/A                         |
| /api/nowplayingMovies/{movieid} | Get a nowplayingMovies                     | N/A                        | N/A | N/A                         |
| /api/people                     | Gets a list of actors                      | N/A                        | N/A | N/A                         |
| /api/people/{movieid}           | Get an actor                               | N/A                        | N/A | N/A                         |
| /api/people/{movieid}/credits   | Get a list of combined credits of an actor | N/A                        | N/A | N/A                         |
| /api/users/{username}/watchlist | Gets the watchlist of user                 | Add movie to the watchlist | N/A | Delete movie from watchlist |

## Security and Authentication
+ the  session is implemented in the middleware of index.js
~~~Javascript
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
~~~

+ the router is protected with passportJWT e.g.
~~~Javascript
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/upcomingMovies',passport.authenticate('jwt', {session: false}), upcomingRouter);
app.use('/api/nowplayingMovies', passport.authenticate('jwt', {session: false}), nowplayingRouter);
app.use('/api/people',passport.authenticate('jwt', {session: false}), peopleRouter);
~~~

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

modify the the javascript code

~~~Javascript
export const getUpcomingMovies = () => {
  return fetch(
    '/api/upcomingMovies', { headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json())
};

export const getNowPlayingMovies = () => {
  return fetch(
    '/api/nowplayingMovies', { headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json())
};

export const getActors = () => {
  return fetch(
    '/api/people', { headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json())
};


export const getActor = actorid => {
  return fetch(
    `/api/people/${actorid}`, { headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json())
}

export const getCombinedCredits = actorid => {
  return fetch(
    `/api/people/${actorid}/credits`, { headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
      ).then(res => res.json())
}
~~~

# Assignment 2 - Agile Software Practice.

Name: WENTAO WU

## Target Web API.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Get /api/users/ - returns an array of users.
+ Post /api/users?action=register - add a new user to database
+ Post /api/users/:username/favourites - add a movie to favourite list
+ Post /api/users/:username/watchlist - add a movie to watchlist
+ Delete /api/users/:username/watchlist - delete a movie in the watchlist
+ Get /api/upcomingMovies - returns an array of upcomingmovie objects.
+ Get /api/upcomingMovies/:id - returns detailed information on a specific upcomingmovie.
+ Get /api/nowplayingMovies - returns an array of nowplayingmovie objects.
+ Get /api/nowplayingMovies/:id - returns detailed information on a specific nowplayingmovie.
+ Get /api/people - returns an array of people objects.
+ Get /api/people/:id - returns detailed information on a specific person.
+ Get /api/people/:id/credits - returns an array of combined credits of a specific peroson.


## Error/Exception Testing.

+ GET /movies/:id - test when the id is invalid. See tests/functional/api/movies.index.js
+ POST /api/users?action=register - test when the password is too simple. Test the user table after posting. See tests/functional/api/users.index.js
+ POST /api/users/user1/favourite - test when the movie is invalid and repeated.  See tests/functional/api/users.index.js
+ POST /api/users/user1/watchlist - test when the movie is repeated.  See tests/functional/api/users.index.js
+ GET /upcomingMovies/:id - test when the id is invalid. See tests/functional/api/upcomingMovies.index.js
+ GET /nowplayingMovies/:id - test when the id is invalid. See tests/functional/api/nowplayingMovies.index.js
+ GET /people/:id - test when the person id is invalid. See tests/functional/api/people.index.js
+ GET /people/:id/credits - test when the person id is invalid. See tests/functional/api/people.index.js

## Continuous Delivery/Deployment.

+ https://agile-assignment2.herokuapp.com/ - Staging deployment
+ https://assignment2-deploy.herokuapp.com/ - Production

+ Staging app overview 

![][stagingapp]

![][stagingapp_movies]

+ Production app overview 

![][productionapp]

![][prodctionapp_users]

[stagingapp]: ./img/agile_stage.png
[productionapp]: ./img/agile_production.png
[stagingapp_movies]: ./img/agile_stage_movie.png
[prodctionapp_users]: ./img/agile_production_users.png