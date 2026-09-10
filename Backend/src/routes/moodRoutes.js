import express from 'express';
import { createMoodEntry, getMoodHistory, getTodayMoods } from '../controllers/moodController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.post('/', createMoodEntry);
router.get('/history', getMoodHistory);
router.get('/today', getTodayMoods);

export default router;
