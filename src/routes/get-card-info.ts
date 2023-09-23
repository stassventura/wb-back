import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/api/cardInfo', async (req, res) => {
    console.log("Вызов")
    try {
        const { bin } = req.body;

        axios.post('https://mrbin.io/bins/display', {bin: bin}).then((axiosResponse)=>{
            res.status(200).send({response: axiosResponse.data });
        }).catch((err)=>console.log(err))
        
    } catch (error: any) {
        console.error('Error creating order:', error);
        res.status(500).send({ message: 'Error creating order', error: error.message });
    }
});

export default router;
