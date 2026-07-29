import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { initdb } from './connection/database.js'

import session from 'express-session'
import passport from './middleware/authenticate-passport.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors())
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    })
    .use('/', routes);

app.get('/',(req,res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged Out")
});

app.get('/github/callback', passport.authenticate('github',{
    failureRedirect: '/api-docs', session: false}),
    (req, res)=> {
        req.session.user = req.user;
        res.redirect('/')
    });

initdb((err) => {
    if(err) {
        console.error('Failed to initialize database', err);
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
