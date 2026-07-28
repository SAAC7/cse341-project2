import express from 'express';
import movies from './movies.js';
import customers from './customers.js';
import swagger from './swagger.js';

const router = express.Router();

router.use('/',swagger);

router.get('/', (req,res) => {
    // #swagger.tags = ["Hello World"];
    res.send('Hello, Wordld!')
});
router.use('/movies',movies);
router.use('/customers',customers);

router.get('/login', passport.authenticate('github'),(req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

export default router;
