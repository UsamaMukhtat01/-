import express from 'express';
import { signUp } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/signUp', signUp)

export default router;