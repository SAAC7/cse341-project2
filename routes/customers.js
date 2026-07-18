import express from 'express';
import customers from '../controller/customers_con.js'
import { validateCustomer, customerValidationRules } from '../middleware/validateCustomer.js';

const router = express.Router();

router.get('/', customers.getAllCustomer);
router.get('/:id', customers.getCustomerById);
router.post('/', 
    customerValidationRules,
    validateCustomer,
    customers.createCustomer);
router.put('/:id', 
    customerValidationRules,
    validateCustomer,
    customers.updateCustomer);
router.delete('/:id', customers.deleteCustomer);

export default router;