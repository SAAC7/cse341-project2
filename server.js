import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { initdb } from './connection/database.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app
    .use(cors())
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    })
    .use('/', routes);

initdb((err) => {
    if(err) {
        console.error('Failed to initialize database', err);
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}');
    })
})