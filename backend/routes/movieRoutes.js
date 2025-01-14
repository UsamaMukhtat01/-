import express from 'express';
import {verifyToken} from '../utils/verifyToken.js'
import { createMovie, deleteMovie, getMovies, updateMovie } from '../controller/movieController.js';

const router = express.Router();

router.post('/createMovie',verifyToken, createMovie)
router.get('/getMovies', getMovies)
router.put('/updateMovie/:movieId',verifyToken, updateMovie)
router.delete('/deleteMovie/:movieId',verifyToken, deleteMovie)

export default router;