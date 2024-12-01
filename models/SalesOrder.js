const mongoose = require("mongoose");

const SalesOrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    paymentTerms: { type: String, required: true },
    items: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },
      },
    ],
    accountDetails: {
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
    },
    subTotal: { type: Number, required: true },
    shippingCharges: { type: Number, default: 0 },
    gstPercentage: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesOrder", SalesOrderSchema);
