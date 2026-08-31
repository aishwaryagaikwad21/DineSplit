import { Bill } from '../models/bill.js';

export const findBill = async (req, res) => {
    try{
        const bill = await Bill.findById(req.params.id)
        if(!bill){
            return res.status(404).send('Bill Not Found')
        }
        res.status(200).send(bill)
    }
    catch(err){
        res.status(400).send(err)
    }
}