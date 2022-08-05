const { check, body } = require('express-validator');
 
exports.createTaskValidation = [
     check('title', 'Title should not be longer than 256 characters.')
     .if(body('title').exists())
     .isLength({ max: 256 }),

     check('title', 'Title cannot be empty.')
     .if(body('title').exists())
     .not().isEmpty(),

     check('description', 'Description should not be longer than 256 characters.')
     .if(body('description').exists())
     .isLength({ max: 256 }),

     check('description', 'Description cannot be empty.')
     .if(body('description').exists())
     .not().isEmpty(),     

     check('status', 'Status should not be longer than 256 characters.')
     .if(body('status').exists())
     .isLength({ max: 256 }),

     check('status', 'Status cannot be empty.')
     .if(body('status').exists())
     .not().isEmpty(),               
]