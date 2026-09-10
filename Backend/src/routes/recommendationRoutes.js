import express from 'express';
import { getRecommendation } from '../controllers/recommendationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, getRecommendation);
router.get('/', authenticate, getRecommendation);

export default router;
