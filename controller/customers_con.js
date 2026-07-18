import { getDb } from '../connection/database.js';
import { ObjectId } from 'mongodb';

// GET /customers
const getAllCustomer = async (req, res) => {
  // #swagger.tags = ['customers'];
  // #swagger.description = 'Endpoint to get all contacts';
    try {
        const db = getDb();
        const customers = await db.collection('customers').find().toArray();
        res.status(200).json(customers);
    } catch (err) {
        console.error('Error fetching customers:', err);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// GET /customers/:id
const getCustomerById = async (req, res) => {
    // #swagger.tags = ['customers'];
    // #swagger.description = 'Endpoint to get a contact by ID';
    const customerId = req.params.id;
    if (!ObjectId.isValid(customerId)) {
        return res.status(400).json({
            error: 'Invalid customer ID'
        });
    }
    try {
        const db = getDb();
        const customer = await db.collection('customers').findOne({
            _id: new ObjectId(customerId)
        });
        if (!customer) {
            return res.status(404).json({
                error: 'Customer not found'
            });
        }
        res.status(200).json(customer);
    } catch (err) {
        console.error('Error fetching customer:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// POST /customers
const createCustomer = async (req, res) => {
    // #swagger.tags = ['customers'];
    // #swagger.description = 'Endpoint to create a new contact';
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        membership: req.body.membership,
        favoriteGenre: req.body.favoriteGenre,
        moviesWatched: req.body.moviesWatched || []
    };
    try {
        const db = getDb();
        const result = await db.collection('customers').insertOne(customer);
        if (!result.acknowledged) {
            return res.status(500).json({
                error: 'Failed to create customer'
            });
        }
        const newCustomer = await db.collection('customers').findOne({
            _id: result.insertedId
        });
        res.status(201).json(newCustomer);
    } catch (err) {
        console.error('Error creating customer:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// PUT /customers/:id
const updateCustomer = async (req, res) => {
    // #swagger.tags = ['customers'];
    // #swagger.description = 'Endpoint to update a contact by ID';
    const customerId = req.params.id;
    if (!ObjectId.isValid(customerId)) {
        return res.status(400).json({
            error: 'Invalid customer ID'
        });
    }
    const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        membership: req.body.membership,
        favoriteGenre: req.body.favoriteGenre,
        moviesWatched: req.body.moviesWatched || []

    };
    try {
        const db = getDb();
        const result = await db.collection('customers').updateOne(

            { _id: new ObjectId(customerId) },

            {
                $set: updateData
            }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Customer not found'
            });
        }
        const updatedCustomer = await db.collection('customers').findOne({
            _id: new ObjectId(customerId)
        });
        res.status(200).json(updatedCustomer);
    } catch (err) {
        console.error('Error updating customer:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// DELETE /customers/:id
const deleteCustomer = async (req, res) => {
    // #swagger.tags = ['customers'];
    // #swagger.description = 'Endpoint to delete a contact by ID';
    const customerId = req.params.id;
    if (!ObjectId.isValid(customerId)) {
        return res.status(400).json({
            error: 'Invalid customer ID'
        });
    }
    try {
        const db = getDb();
        const result = await db.collection('customers').deleteOne({
            _id: new ObjectId(customerId)
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Customer not found'
            });
        }
        res.status(200).json({
            message: 'Customer deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
export default {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};