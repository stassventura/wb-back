import express from 'express';
import Product from '../modules/Order';

const router = express.Router();

  router.get('/api/order', async (req, res) => {
    const id = req.query.id;
    console.log(`Received id: ${id}`);
    
    try {
        const product = await Product.findOne({ id: id });
        if (product) {
            res.json({status: 200, product: product });
        } else {
            res.status(404).json({status: 404, message: 'Product not found'});
        }
    } catch (error) {
        console.error(`Error fetching product by ID: ${error}`);
        res.status(500).json({status: 500, message: 'Internal Server Error'});
    }
});
export default router;
