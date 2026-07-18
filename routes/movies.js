import express from 'express';
import movies from '../controller/movies_con.js'

const router = express.Router();

router.get('/', movies.getAllMovies);
router.get('/:id', movies.getMovieById);
router.post('/', movies.createMovie);
router.put('/:id', movies.updateMovie);
router.delete('/:id', movies.deleteMovie);

export default router;