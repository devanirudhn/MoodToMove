import express from 'express';
import { getDashboardStats } from '../controllers/sessionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.get('/dashboard', getDashboardStats);

export default router;
