import express from 'express';
import customers from '../controller/customers_con.js'

const router = express.Router();

router.get('/', customers.getAllCustomer);
router.get('/:id', customers.getCustomerById);
router.post('/', customers.createCustomer);
router.put('/:id', customers.updateCustomer);
router.delete('/:id', customers.deleteCustomer);

export default router;