import express from 'express';
import movies from '../controller/movies_con.js'
import { validateMovie, movieValidationRules } from '../middleware/validateMovie.js';

const router = express.Router();

router.get('/', movies.getAllMovies);
router.get('/:id', movies.getMovieById);
router.post('/',
    movieValidationRules,
    validateMovie,
    movies.createMovie);
router.put('/:id', 
    movieValidationRules,
    validateMovie,
    movies.updateMovie);
router.delete('/:id', movies.deleteMovie);

export default router;