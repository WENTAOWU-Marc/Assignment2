import express from 'express';
import NowplayingModel from './nowplayingModel';

const router = express.Router();
 
router.get('/', (req, res, next) => {
    NowplayingModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  NowplayingModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

export default router;