const express = require('express');

const app = express();
app.use(express.json());

const products = require('./routes/products');

app.use('/api/products', products);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});