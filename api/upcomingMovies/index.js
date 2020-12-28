import express from 'express';
import UpcomingModel from './upcomingModel';

const router = express.Router();
 
router.get('/', (req, res, next) => {
  UpcomingModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  UpcomingModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

export default router;