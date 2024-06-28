import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';
import validators from '../validators/validators.js';


const router = express.Router();

router.post(
  '/register',
  [
    validators.emailValidator,
    validators.passwordValidator,
    validators.userNameValidator,
    validators.roleValidator,
  ],
  registerUser);

router.post('/login', [validators.loginInputValidator], loginUser);

export default router;