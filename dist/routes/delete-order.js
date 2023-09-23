"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../modules/Order"));
const router = express_1.default.Router();
router.post('/api/order/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).send({ message: 'Айди обязателен' });
        }
        const product = yield Order_1.default.findOne({ id: productId });
        if (!product) {
            return res.status(404).send({ message: 'Товар не найден' });
        }
        yield product.deleteOne();
        res.status(200).send({ message: 'Товар успешно удален!' });
    }
    catch (error) {
        console.error('Ошибка удаления товара:', error);
        res.status(500).send({ message: 'Ошибка удаления товара', error: error.message });
    }
}));
exports.default = router;
