import express from 'express';
import { updateMe, savePreferences } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.patch('/me', updateMe);
router.post('/preferences', savePreferences);

export default router;
