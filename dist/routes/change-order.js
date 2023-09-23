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
router.post('/api/order/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, param, newValue } = req.body;
        if (!productId || !param || newValue === undefined) {
            return res.status(400).send({ message: 'Invalid request data' });
        }
        const updateObject = {};
        updateObject[param] = newValue;
        const product = yield Order_1.default.findOneAndUpdate({ id: productId }, updateObject, { new: true });
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product successfully updated', product: product });
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({ message: 'Error updating product', error: error.message });
    }
}));
exports.default = router;
