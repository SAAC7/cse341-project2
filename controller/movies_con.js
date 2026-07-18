import { json } from 'express';
import {getDb} from '../connection/database.js'
import { ObjectId } from 'mongodb'

const getAllMovies = async (req, res) => {
    try{
        const db = getDb();
        const movies = await db.collection('movies').find().toArray();
        res.status(200).json(movies);
    } catch (err){
        console.error("Error  fetching customers: ", err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getMovieById = async (req, res) => {
    const movieId = req.params.id;
    try {
        const db = getDb();
        const movie = await db.collection('movies').findOne({_id: new ObjectId(movieId)});
        if (!movie) {
            return res.status(404).json({error: 'Movie not found'});
        }
        res.status(200).json(movie);
    } catch (err) {
        console.error('Error fetching movie by ID: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};