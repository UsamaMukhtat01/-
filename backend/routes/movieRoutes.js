import express from 'express';
import {verifyToken} from '../utils/verifyToken.js'
import { createMovie, getMovies, updateMovie } from '../controller/movieController.js';

const router = express.Router();

router.post('/createMovie',verifyToken, createMovie)
router.get('/getMovies',verifyToken, getMovies)
router.put('/updateMovie/:movieId',verifyToken, updateMovie)

export default router;