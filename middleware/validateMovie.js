import { body, validationResult } from 'express-validator';

const movieValidationRules = [

    body('title')
        .notEmpty()
        .withMessage('Title is required'),

    body('genre')
        .notEmpty()
        .withMessage('Genre is required'),

    body('director')
        .notEmpty()
        .withMessage('Director is required'),

    body('releaseYear')
        .isInt({ min: 1888 })
        .withMessage('Release year is invalid'),

    body('duration')
        .isInt({ min: 1 })
        .withMessage('Duration must be greater than zero'),

    body('rating')
        .isFloat({ min: 0, max: 10 })
        .withMessage('Rating must be between 0 and 10'),

    body('available')
        .isBoolean()
        .withMessage('Available must be true or false')

];

const validateMovie = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

export { movieValidationRules, validateMovie };