import { Bill } from '../models/bill.js';

export const findBill = async (req, res) => {
    try{
        const bill = await Bill.findById(req.body._id)
        if(!bill){
            res.status(404).send('Bill Not Found')
        }
        res.status(200).send(bill)
    }
    catch(err){
        res.status(400).send(err)
    }
}