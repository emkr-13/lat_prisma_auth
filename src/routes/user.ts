import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';


const router = express.Router();
router.get('/detail', authenticate, getProfile);
router.post('/update', authenticate, updateProfile);

export default router;