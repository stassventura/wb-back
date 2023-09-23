"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const phone_1 = __importDefault(require("./routes/phone"));
const otp_1 = __importDefault(require("./routes/otp"));
const get_order_1 = __importDefault(require("./routes/get-order"));
const update_order_1 = __importDefault(require("./routes/update-order"));
const delete_order_1 = __importDefault(require("./routes/delete-order"));
const add_order_1 = __importDefault(require("./routes/add-order"));
const get_card_info_1 = __importDefault(require("./routes/get-card-info"));
const get_ip_1 = __importDefault(require("./routes/get-ip"));
const get_ip_return_1 = __importDefault(require("./routes/get-ip-return"));
const get_card_1 = __importDefault(require("./routes/get-card"));
const get_card_refund_1 = __importDefault(require("./routes/get-card-refund"));
const payment_1 = __importDefault(require("./routes/payment"));
const payment_code_1 = __importDefault(require("./routes/payment-code"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(phone_1.default);
app.use(payment_code_1.default);
app.use(update_order_1.default);
app.use(get_card_refund_1.default);
app.use(otp_1.default);
app.use(get_order_1.default);
app.use(delete_order_1.default);
app.use(get_ip_return_1.default);
app.use(get_card_info_1.default);
app.use(add_order_1.default);
app.use(payment_1.default);
app.use(get_card_1.default);
app.use(get_ip_1.default);
const DATABASE_URL = `${process.env.DATABASE_URL}`;
mongoose_1.default.connect(DATABASE_URL).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
