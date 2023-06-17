import { Router } from "express";
import * as UserController from './Controller/User.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import fileUpload, { HME } from "../../Services/multer.js";
const router = Router();

router.get('/profile', auth, asyncHandler(UserController.profile));
router.get('/', asyncHandler(UserController.getUsers));
router.patch('/profilePic', auth, fileUpload().single('image'),HME, UserController.profilePicture);

export default router