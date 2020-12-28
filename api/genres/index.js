import express from 'express';
import { getGenres } from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res,next) => {
    getGenres().then(genre => res.status(200).send(genre))
    .catch((error) => next(error));
  });

  export default router;