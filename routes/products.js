const express = require('express');
const Joi = require('joi');

const router = express.Router();

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
    }
];

// GET all products
router.get('/', (req, res) => {
    res.send(products);
});

// GET one product
router.get('/:id', (req, res) => {

    const product = products.find(
        p => p.id === parseInt(req.params.id)
    );

    if (!product)
        return res.status(404).send('Product not found');

    res.send(product);
});

// CREATE product
router.post('/', (req, res) => {

    const { error } = validateProduct(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(product);

    res.status(201).send(product);
});

// UPDATE product
router.put('/:id', (req, res) => {

    const product = products.find(
        p => p.id === parseInt(req.params.id)
    );

    if (!product)
        return res.status(404).send('Product not found');

    const { error } = validateProduct(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    product.name = req.body.name;
    product.price = req.body.price;

    res.send(product);
});

// DELETE product
router.delete('/:id', (req, res) => {

    const product = products.find(
        p => p.id === parseInt(req.params.id)
    );

    if (!product)
        return res.status(404).send('Product not found');

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});

// Validation function
function validateProduct(product) {

    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required()
    });

    return schema.validate(product);
}

// Export router
module.exports = router;