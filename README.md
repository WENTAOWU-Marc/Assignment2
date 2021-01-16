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
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

the javascript code

~~~Javascript
export const getUpcomingMovies = () => {
  return fetch(
    '/api/upcomingMovies', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => json.results);
};

~~~



# Assignment 2 - Agile Software Practice.

Name: WENTAO WU

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Put /api/movies/:id - update a specific movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.
+ Post /api/movies - add a new movie to the database.
+ etc.
+ etc.  

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://movies-api-trial-staging.herokuapp.com/ - Staging deployment
+ https://movies-api-production.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

[ , , , screenshot here . . . ]

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.png