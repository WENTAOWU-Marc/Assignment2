import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import upcomingModel from '../api/upcomingMovies/upcomingModel';
import nowplayingModel from '../api/nowplayingMovies/nowplayingModel';
import peopleModel from '../api/people/peopleModel';
import { movies } from './movies.js';
import { getUpcomingMovies, getNowPlayingMovies, getActor, getActors } from '../api/tmdb-api';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadUpcomingMovies() {
  console.log('load upcomingmovies');
  try {
    getUpcomingMovies().then(async res => {
      await upcomingModel.deleteMany();
      await upcomingModel.collection.insertMany(res);
      console.info(`${res.length} Upcomingmovies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load upcomingmovie Data: ${err}`);
  }
}

export async function loadNowplayingMovies() {
  console.log('load nowplayingmovies');
  try {
    getNowPlayingMovies().then(async res => {
      await nowplayingModel.deleteMany();
      await nowplayingModel.collection.insertMany(res);
      console.info(`${res.length} Nowplayingmovies were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load nowplayingmovie Data: ${err}`);
  }
}

export async function loadPeople() {
  console.log('load nowplayingmovies');
  try {
    getActors().then(async res => {
      await peopleModel.deleteMany();
      await peopleModel.collection.insertMany(res);
      console.info(`${res.length} actors were successfully stored.`);
    })
  } catch (err) {
    console.error(`failed to Load actor Data: ${err}`);
  }
}