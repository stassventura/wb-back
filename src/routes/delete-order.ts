import express, { Request, Response } from 'express';
import Product from '../modules/Order';
const router = express.Router();

router.post('/api/order/delete', async (req: Request, res: Response) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).send({ message: 'Айди обязателен' });
        }

        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).send({ message: 'Товар не найден' });
        }

        await product.deleteOne();

        res.status(200).send({ message: 'Товар успешно удален!' });
    } catch (error: any) {
        console.error('Ошибка удаления товара:', error);
        res.status(500).send({ message: 'Ошибка удаления товара', error: error.message });
    }
});

export default router;
