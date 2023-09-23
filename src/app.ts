require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import phoneRouter from './routes/phone'
import otpRouter from './routes/otp'
import getOrder from './routes/get-order'
import updateOrder from './routes/update-order'
import deleteOrder from './routes/delete-order'
import addOrder from './routes/add-order'
import cardInfo from './routes/get-card-info'
import getIp from './routes/get-ip'
import getIpRefund from './routes/get-ip-return'
import getCard from './routes/get-card'
import getCardRefund from './routes/get-card-refund'
import payment from './routes/payment'
import paymentCode from './routes/payment-code'
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());
app.use(phoneRouter);
app.use(paymentCode);
app.use(updateOrder);
app.use(getCardRefund);
app.use(otpRouter);
app.use(getOrder);
app.use(deleteOrder);
app.use(getIpRefund);
app.use(cardInfo);
app.use(addOrder);
app.use(payment);
app.use(getCard);
app.use(getIp);



const DATABASE_URL = `${process.env.DATABASE_URL}`;
mongoose.connect(DATABASE_URL).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});







const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
