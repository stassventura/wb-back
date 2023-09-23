import express from 'express';
import Product from '../modules/Order';
const router = express.Router();

router.post('/api/order', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        console.log(productData)
        await newProduct.save();

        res.status(201).send({ message: 'Product successfully created', product: newProduct });
    } catch (error: any) {
        console.error('Error creating product:', error);
        res.status(500).send({ message: 'Error creating product', error: error.message });
    }
});


export default router;