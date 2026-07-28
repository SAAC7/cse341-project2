import express from 'express';
import customers from '../controller/customers_con.js'
import { validateCustomer, customerValidationRules } from '../middleware/validateCustomer.js';

import { isAuthenticated } = from '../middleware/authenticate.js'

const router = express.Router();

router.get('/', customers.getAllCustomer);
router.get('/:id', customers.getCustomerById);
router.post('/',
    isAuthenticated,
    customerValidationRules,
    validateCustomer,
    customers.createCustomer);
router.put('/:id', 
    isAuthenticated,
    customerValidationRules,
    validateCustomer,
    customers.updateCustomer);
router.delete('/:id',
    isAuthenticated,
    customers.deleteCustomer);

export default router;
