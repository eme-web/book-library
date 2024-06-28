import { check } from 'express-validator';


const loginInputValidator = check('password', 'email')
  .customSanitizer((value) => value.toLowerCase().trim())
  .notEmpty()
  .withMessage('input a valid email or password');

const emailValidator = check('email')
  .customSanitizer((value) => value.toLowerCase().trim())
  .isEmail()
  .withMessage('Please provide a valid Email address');

const userNameValidator = check('fullName')
  .notEmpty()
  .withMessage('Input FullName')
  .isLength({ min: 4 })
  .withMessage('FullName should be at least 4 characters');

const roleValidator = check('role')
.notEmpty()
.withMessage('Input role')
.isLength({ min: 4 })
.withMessage('role should be at least 4 characters');

const passwordValidator = check('password')
  .customSanitizer((value) => value.trim())
  .isLength({ min: 6 })
  .withMessage('Password must be a minimum of 6 characters')
  .matches(/\d/)
  .withMessage('Password must contain a number')
  .not()
  .isIn(['123456', 'password', 'god', '0000'])
  .withMessage('Password to easy to guess, use something stronger ');


export default {
  loginInputValidator,
  passwordValidator,
  emailValidator,
  userNameValidator,
  roleValidator,
 
};
