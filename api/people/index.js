import express from 'express';
import peopleModel from './peopleModel';
import { getCombinedCredits }from '../tmdb-api'
const router = express.Router();
 
router.get('/', (req, res, next) => {
  peopleModel.find().then(people => res.status(200).send(people)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  peopleModel.findByMovieDBId(id).then(people => res.status(200).send(people)).catch(next);
});

router.get('/:id/credits', (req, res, next) => {
  const id = parseInt(req.params.id);
  getCombinedCredits(id)
  .then(credits => res.status(200).send(credits))
  .catch((error) => next(error));
});
export default router;