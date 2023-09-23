import express, { Request, Response } from 'express';
import Order from '../modules/Order'
import Product from '../modules/Order';
const router = express.Router();

router.post('/api/order/update', async (req: Request, res: Response) => {
    try {
        const { productId, param, newValue }: { productId: string, param: string, newValue: any } = req.body;

        if (!productId || !param || newValue === undefined) {
            return res.status(400).send({ message: 'Invalid request data' });
        }

        const updateObject: any = {};
        updateObject[param] = newValue;

        const product = await Product.findOneAndUpdate({ id: productId }, updateObject, { new: true });

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send({ message: 'Product successfully updated', product: product });
    } catch (error: any) {
        console.error('Error updating product:', error);
        res.status(500).send({ message: 'Error updating product', error: error.message });
    }
});

export default router;

