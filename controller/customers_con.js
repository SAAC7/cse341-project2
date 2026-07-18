import { json } from 'express';
import {getDb} from '../connection/database.js'
import { ObjectId } from 'mongodb'

const getAllCustomer = async (req, res) => {
    try{
        const db = getDb();
        const customer = await db.collection('Customers').find().toArray();
        res.status(200),json(customer);
    } catch (err){
        console.error("Error  fetching customers: ", err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}