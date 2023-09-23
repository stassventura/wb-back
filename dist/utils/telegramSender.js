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
exports.sendTelegramMessage = void 0;
const axios_1 = __importDefault(require("axios"));
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
function sendTelegramMessage(clientIP, messageText) {
    return __awaiter(this, void 0, void 0, function* () {
        let locationInfo = "IP неизвестен";
        if (clientIP !== "IP неизвестен") {
            try {
                const ipInfo = yield axios_1.default.get(`https://ipinfo.io/${clientIP}/json`);
                const country = ipInfo.data.country || "Неизвестен";
                const city = ipInfo.data.city || "Неизвестен";
                let flag = countryFlags[country.toLowerCase()];
                if (!flag) {
                    flag = '🏳';
                }
                locationInfo = `📌 ${flag}<b> ${city}</b>`;
            }
            catch (error) {
                console.error(`Error fetching IP info: ${error}`);
                locationInfo = `🌎 <b>IP недоступен</b>`;
            }
        }
        const message = `
        ${messageText}\n ${locationInfo}`;
        try {
            yield axios_1.default.post(baseURL, {
                chat_id: chat_id,
                text: message,
                parse_mode: 'HTML'
            });
            return { status: 'success' };
        }
        catch (error) {
            console.error(`Error sending message to Telegram: ${error}`);
            return { status: 'error', message: 'Unable to send message to Telegram' };
        }
    });
}
exports.sendTelegramMessage = sendTelegramMessage;
