const express = require('express')
const { CreateSalesOrder, GetAllOrders, GetSingleOrder, UpdateOrder, DeleteOrder } = require('../controllers/SalesOrder')

const router = express.Router()

router.post('/add',CreateSalesOrder);
router.get('/',GetAllOrders)
router.get('/get/:id',GetSingleOrder)
router.put('/update/:id',UpdateOrder)
router.delete('/delete/:id',DeleteOrder)


module.exports = router