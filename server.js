require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectdb = require('./config/DB')
const salesOrder = require('./routes/SalesOrder');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

connectdb();

app.use('/api/orders', salesOrder);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
