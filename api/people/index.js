import express from 'express';
import peopleModel from './peopleModel';

const router = express.Router();
 
router.get('/', (req, res, next) => {
  peopleModel.find().then(people => res.status(200).send(people)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  peopleModel.findByMovieDBId(id).then(people => res.status(200).send(people)).catch(next);
});

export default router;