import express from 'express';
import { promoteToAdmin, signin, signup } from '../controller/authController.js';
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.patch('/promote/:id', verifyToken,promoteToAdmin)

export default router;