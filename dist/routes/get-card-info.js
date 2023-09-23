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
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.post('/api/cardInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Вызов");
    try {
        const { bin } = req.body;
        axios_1.default.post('https://mrbin.io/bins/display', { bin: bin }).then((axiosResponse) => {
            res.status(200).send({ response: axiosResponse.data });
        }).catch((err) => console.log(err));
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send({ message: 'Error creating order', error: error.message });
    }
}));
exports.default = router;
