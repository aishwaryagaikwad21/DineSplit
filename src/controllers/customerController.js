import { Bill } from '../models/bill.js';
import { splitBill } from '../services/splitBill.js';

export const findBill = async (req, res) => {
    try{
        const {bill_id, restaurant_id} = req.params
        
        const bill = await Bill.searchBill(bill_id, restaurant_id)
        
        if(!bill){
            return res.status(404).send('Bill Not Found')
        }
        
        res.status(200).send(bill)
    }
    catch(err){
        res.status(400).send(err)
    }
}

export const billDetails = async (req, res) => {
    try{
       const { bill_id } = req.params

       const {
        restaurant_id,
        splitType,
        totalMembers,
        memNames,
        dishDetails
       } = req.body
    
       const bill = await Bill.searchBill(bill_id, restaurant_id)
       if(!bill){
           return res.status(404).send('Not found')
       }

      const splitBillDetails = await splitBill({
            bill, 
            splitType, 
            totalMembers, 
            memNames, 
            dishDetails
        })

      res.status(200).send(splitBillDetails)

    }
    catch(err){
        res.status(400).send(err)
    }
}