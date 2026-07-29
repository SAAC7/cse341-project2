import express from 'express';
import movies from '../controller/movies_con.js'
import { validateMovie, movieValidationRules } from '../middleware/validateMovie.js';

import { isAuthenticated } from '../middleware/authenticate.js'

const router = express.Router();

router.get('/', movies.getAllMovies);
router.get('/:id', movies.getMovieById);
router.post('/',
    isAuthenticated,
    movieValidationRules,
    validateMovie,
    movies.createMovie);
router.put('/:id',
    isAuthenticated,
    movieValidationRules,
    validateMovie,
    movies.updateMovie);
router.delete('/:id',
    isAuthenticated,
    movies.deleteMovie);

export default router;
