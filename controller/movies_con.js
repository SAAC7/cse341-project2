import { getDb } from '../connection/database.js';
import { ObjectId } from 'mongodb';

// GET /movies
const getAllMovies = async (req, res) => {
    // #swagger.tags = ['Movies'];
    // #swagger.description = 'Endpoint to get all movies';
    try {
        const db = getDb();
        const movies = await db
            .collection('movies')
            .find()
            .toArray();
        res.status(200).json(movies);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// GET /movies/:id
const getMovieById = async (req, res) => {
    // #swagger.tags = ['Movies'];
    // #swagger.description = 'Endpoint to get a movie by ID';
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
        return res.status(400).json({
            error: 'Invalid movie ID'
        });
    }
    try {
        const db = getDb();
        const movie = await db.collection('movies').findOne({
            _id: new ObjectId(movieId)
        });
        if (!movie) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }
        res.status(200).json(movie);
    } catch (err) {
        console.error('Error fetching movie:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// POST /movies
const createMovie = async (req, res) => {
    // #swagger.tags = ['Movies'];
    // #swagger.description = 'Endpoint to create a new movie';
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        director: req.body.director,
        releaseYear: req.body.releaseYear,
        duration: req.body.duration,
        rating: req.body.rating,
        available: req.body.available
    };
    try {
        const db = getDb();
        const result = await db.collection('movies').insertOne(movie);
        if (!result.acknowledged) {
            return res.status(500).json({
                error: 'Failed to create movie'
            });
        }
        const newMovie = await db.collection('movies').findOne({
            _id: result.insertedId
        });
        res.status(201).json(newMovie);
    } catch (err) {
        console.error('Error creating movie:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// PUT /movies/:id
const updateMovie = async (req, res) => {
    // #swagger.tags = ['Movies'];
    // #swagger.description = 'Endpoint to update a movie by ID';
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
        return res.status(400).json({
            error: 'Invalid movie ID'
        });
    }
    const updateData = {
        title: req.body.title,
        genre: req.body.genre,
        director: req.body.director,
        releaseYear: req.body.releaseYear,
        duration: req.body.duration,
        rating: req.body.rating,
        available: req.body.available
    };
    try {
        const db = getDb();
        const result = await db.collection('movies').updateOne(
            {
                _id: new ObjectId(movieId)
            },
            {
                $set: updateData
            }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }
        const updatedMovie = await db.collection('movies').findOne({
            _id: new ObjectId(movieId)
        });
        res.status(200).json(updatedMovie);
    } catch (err) {
        console.error('Error updating movie:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// DELETE /movies/:id
const deleteMovie = async (req, res) => {
    // #swagger.tags = ['Movies'];
    // #swagger.description = 'Endpoint to delete a movie by ID';
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
        return res.status(400).json({
            error: 'Invalid movie ID'
        });
    }
    try {
        const db = getDb();
        const result = await db.collection('movies').deleteOne({
            _id: new ObjectId(movieId)
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }
        res.status(200).json({
            message: 'Movie deleted successfully'
        });

    } catch (err) {
        console.error('Error deleting movie:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
export default {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie

};