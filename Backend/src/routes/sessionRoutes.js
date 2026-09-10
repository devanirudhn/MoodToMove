import express from 'express';
import { createSession, getSessions, getDashboardStats } from '../controllers/sessionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.post('/', createSession);
router.get('/', getSessions);

export default router;
