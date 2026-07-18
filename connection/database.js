import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
let db;
const initdb = (callback) => {
    if (db) {
        console.log("Database is already initialized")
        return callback(null,db);
    }
    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            db = client.db(process.env.MONGO_DB_NAME);
            console.log("Database Initialized!");
            return callback(null,db);
        })
        .catch((err) => {
            console.log("Error Initializing database: ",err);
            return callback(err);
        });
}

const getDb = () => {
    if (!db) {
        throw new Error("Database not Initialized");
    }
    return db;
};