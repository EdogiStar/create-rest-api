const Joi = require('joi');
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

app.post('/api/products', (req, res) => {
    // object destructuring
   const { error } = validateProduct(req.body);
   if(error) return res.status(400).send(error.details[0].message);
        
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
   products.push(product);
   res.send(product);
});

app.put('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('Product not found');
    
    const { error } = validateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
    product.name = req.body.name;
    product.price = req.body.price;
    
    res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('Product not found');
    
    const index = products.indexOf(product);
    products.splice(index, 1);
    
    res.send(product);
});

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required()
    });

    return schema.validate(product);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
