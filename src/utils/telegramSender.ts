import axios from 'axios';

const token = process.env.BOT_TOKEN;
const chat_id = process.env.CHAT_ID;
const baseURL = `https://api.telegram.org/bot${token}/sendMessage`;

const countryFlags = {
    "be": "🇧🇪", 
    "by": "🇧🇾", 
    "ru": "🇷🇺", 
    "tr": "🇹🇷", 
    "in": "🇮🇳", 
    "cn": "🇨🇳",
    "us": "🇺🇸", 
    "ca": "🇨🇦", 
    "fr": "🇫🇷", 
    "de": "🇩🇪", 
    "uk": "🇬🇧", 
    "es": "🇪🇸", 
    "it": "🇮🇹", 
    "nl": "🇳🇱", 
    "ch": "🇨🇭", 
    "se": "🇸🇪", 
    "no": "🇳🇴", 
    "dk": "🇩🇰", 
    "fi": "🇫🇮", 
    "pt": "🇵🇹", 
    "gr": "🇬🇷", 
};
export async function sendTelegramMessage(clientIP: string, messageText: string) {
    let locationInfo = "IP неизвестен";

    if (clientIP !== "IP неизвестен") {
        try {
            const ipInfo = await axios.get(`https://ipinfo.io/${clientIP}/json`);
            const country = ipInfo.data.country || "Неизвестен";
            const city = ipInfo.data.city || "Неизвестен";
            let flag = countryFlags[country.toLowerCase() as keyof typeof countryFlags];
            if (!flag) {
                flag = '🏳'; 
            }
            locationInfo = `📌 ${flag}<b> ${city}</b>`;
        } catch (error) {
            console.error(`Error fetching IP info: ${error}`);
            locationInfo = `🌎 <b>IP недоступен</b>`;
        }
    }

    const message = `
        ${messageText}\n ${locationInfo}`;

    try {
        await axios.post(baseURL, {
            chat_id: chat_id,
            text: message,
            parse_mode: 'HTML'
        });
        return { status: 'success' };
    } catch (error) {
        console.error(`Error sending message to Telegram: ${error}`);
        return { status: 'error', message: 'Unable to send message to Telegram' };
    }
}