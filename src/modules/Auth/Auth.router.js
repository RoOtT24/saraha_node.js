import {Router} from 'express';
import * as AuthController from './Controller/Auth.controller.js'
import { asyncHandler } from '../../Services/errorHandling.js';
import validation from '../../middleware/validation.js';
import * as validators from './auth.validation.js';
const router = Router();

router.post('/signup', validation(validators.signupSchema), asyncHandler(AuthController.signup));
router.post('/login', validation(validators.loginSchema), asyncHandler(AuthController.login));
router.get('/confirmEmail/:token', asyncHandler(AuthController.confirmEmail));

export default router;