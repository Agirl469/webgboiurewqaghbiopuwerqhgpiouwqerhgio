import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
const router = express.Router();

router.post('/', sendMessage);
router.get('/:groupId', getMessages);

export default router;