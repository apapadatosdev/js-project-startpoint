const { check } = require('express-validator');
 
exports.loginValidation = [
     check('email', 'Please enter a valid email').isEmail(),
     check('email', 'E-mail should not be longer that 156 characters.').isLength({ max: 256 }),
     check('password', 'Password must be 5 or more characters').isLength({ min: 5, max: 256 }) 
]