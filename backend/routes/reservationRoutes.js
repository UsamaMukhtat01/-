import express from 'express';
import { cancelReservation, reserveSeat } from '../controller/reservationController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/reservation', verifyToken, reserveSeat)
router.put('/cancelReservation/:reservationId', verifyToken, cancelReservation)

export default router;