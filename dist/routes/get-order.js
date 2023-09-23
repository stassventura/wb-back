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
router.get('/api/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    console.log(`Received id: ${id}`);
    try {
        const product = yield Order_1.default.findOne({ id: id });
        if (product) {
            res.json({ status: 200, product: product });
        }
        else {
            res.status(404).json({ status: 404, message: 'Product not found' });
        }
    }
    catch (error) {
        console.error(`Error fetching product by ID: ${error}`);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}));
exports.default = router;
