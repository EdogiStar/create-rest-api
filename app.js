const express = require('express');
const app = express();

app.use(express.json());

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 500
    },
        {
        id: 2,
        name: 'Product 2',
        price: 5200
    },
    {
        id: 3,
        name: 'Product 3',
        price: 100
    },
];

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id',(req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('Product not found');
    res.send(product);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
