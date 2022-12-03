const { body} = require('express-validator')

exports.UserValidation=[
    body('email','Invalid email').isEmail(),
    body('password','Password must be between 6 and 10 characters').isLength({ min: 6, max: 10 }),
    body('password','Password must contain at least one lowercase letter').matches(/^(.*[a-z].*)$/),
    body('password','Password must contain at least one uppercase letter').matches(/^(.*[A-Z].*)$/),
]