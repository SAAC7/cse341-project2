import { body, validationResult } from 'express-validator';

const customerValidationRules = [

    body('firstName')
        .notEmpty()
        .withMessage('First name is required'),

    body('lastName')
        .notEmpty()
        .withMessage('Last name is required'),

    body('email')
        .isEmail()
        .withMessage('Valid email is required'),

    body('phone')
        .notEmpty()
        .withMessage('Phone number is required'),

    body('membership')
        .isIn(['Basic', 'Premium', 'VIP'])
        .withMessage('Membership must be Basic, Premium or VIP'),

    body('favoriteGenre')
        .notEmpty()
        .withMessage('Favorite genre is required'),

    body('moviesWatched')
        .optional()
        .isArray()
        .withMessage('Movies watched must be an array')

];

const validateCustomer = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

export { customerValidationRules, validateCustomer };