import express from 'express';
const router = express.Router();
import { sendTelegramMessage } from '../utils/telegramSender';


router.get('/api/get-ip', async (req, res) => {
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    if (Array.isArray(clientIP)) {
        clientIP = clientIP[0];
    } else if (!clientIP || clientIP === "") {
        clientIP = "IP неизвестен";
    }   
    
    const productName = req.query.name;
    const productPrice = req.query.price;

    const messageText = `
        <b>🔔Переход на страницу товара🔔</b>\n\n🎁 <b>${productName}\n💵 ${productPrice} ₽</b>
    `;

    const result = await sendTelegramMessage(clientIP, messageText);
    res.json(result);
   
});


export default router;