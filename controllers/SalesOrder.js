const SalesOrder = require('../models/SalesOrder');


const CreateSalesOrder = async (req, res) => {
  try {
    const { customerName, customerAddress, paymentTerms, items, accountDetails, shippingCharges, gstPercentage } = req.body;

    const subTotal = items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.rate;
      const discount = itemTotal * (item.discountPercentage / 100);
      const tax = (itemTotal - discount) * (item.tax / 100);
      return acc + itemTotal - discount + tax;
    }, 0);

    const gstAmount = (subTotal + shippingCharges) * (gstPercentage / 100);
    const grandTotal = Math.round(subTotal + shippingCharges + gstAmount);

    const salesOrder = new SalesOrder({
      customerName,
      customerAddress,
      paymentTerms,
      items,
      accountDetails,
      subTotal,
      shippingCharges,
      gstPercentage,
      grandTotal
    });

    await salesOrder.save();
    res.status(201).json({ message: 'Sales order created successfully', salesOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const GetAllOrders = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find();
    res.status(200).json(salesOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetSingleOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id);
    if (!salesOrder) return res.status(404).json({ message: 'Sales order not found' });
    res.status(200).json(salesOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const UpdateOrder = async (req, res) => {
  try {
    const updatedSalesOrder = await SalesOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSalesOrder) return res.status(404).json({ message: 'Sales order not found' });
    res.status(200).json({ message: 'Sales order updated successfully', updatedSalesOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const DeleteOrder = async (req, res) => {
  try {
    const deletedSalesOrder = await SalesOrder.findByIdAndDelete(req.params.id);
    if (!deletedSalesOrder) return res.status(404).json({ message: 'Sales order not found' });
    res.status(200).json({ message: 'Sales order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {CreateSalesOrder,GetAllOrders,GetSingleOrder,UpdateOrder,DeleteOrder};
