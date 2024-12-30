import express from 'express';
import { reserveSeat } from '../controller/reservationController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/reservation', verifyToken, reserveSeat)

export default router;