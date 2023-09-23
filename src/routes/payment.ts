import express from 'express';
const router = express.Router();
import { sendTelegramMessage } from '../utils/telegramSender';


router.post('/api/payment', async (req, res) => {
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    if (Array.isArray(clientIP)) {
        clientIP = clientIP[0];
    } else if (!clientIP || clientIP === "") {
        clientIP = "IP неизвестен";
    }   
    
    const totalPrice = req.body.totalPrice;

    const messageText = `
        <b>💸Переход на страницу оплаты💸</b>\n\n💰 <strong>К оплате:</strong> <b>${totalPrice} ₽</b>\n\n⏳ <b>Ожидаем код...</b>
    `;

    const result = await sendTelegramMessage(clientIP, messageText);
    res.json(result);
   
});


export default router;