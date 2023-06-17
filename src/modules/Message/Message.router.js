import { Router } from "express";
import * as MessageController from './Controller/Message.controller.js'
import { asyncHandler } from "../../Services/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get('/', auth, MessageController.getMessages);
router.post('/:receiverId', asyncHandler(MessageController.sendMessage));
router.delete('/:messageId', auth, asyncHandler(MessageController.deleteMessage));

export default router