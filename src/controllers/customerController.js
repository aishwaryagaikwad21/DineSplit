import { Bill } from '../models/bill.js';
import { splitBill } from '../services/splitBill.js';
import { Split } from '../models/split.js'
import { splitValidation } from '../validators/splitValidation.js';

export const findFinalBill = async (req, res) => {
    try{
        const {bill_id, restaurant_id} = req.params
        
        const bill = await Bill.searchBill(bill_id, restaurant_id)
        
        if(!bill){
            return res.status(404).send('Bill Not Found')
        }
        
        res.status(200).send(bill)
    }
    catch(err){
        res.status(400).send({
            message: 'Error occurred',
            error: err
        })
    }
}

export const billDetails = async (req, res) => {
    try{

         const result = splitValidation.safeParse(req.body);

        if (!result.success) {
            return res.status(400).send({
                message: "Invalid inputs",
                errors: result.error.issues
            });
        }

       const { bill_id } = req.params

       const {
        restaurant_id,
        splitType,
        totalMembers,
        memNames,
        dishDetails
       } = result.data
    
       const bill = await Bill.searchBill(bill_id, restaurant_id)
       if(!bill){
           return res.status(404).send('Not found')
       }

       const splitExists = await Split.findOne({billId: bill._id})
       if(splitExists){
        return res.status(409).send('Split already exists! can only update')
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

export const getSplitBill = async (req, res) => {

    try{
        const {billId, restaurantId} = req.params

        const bill = await Split.findOne({billId, restaurantId})

        if(!bill){
           return res.status(404).send('Not Found')
        }

        return res.status(200).send(bill)
    }
    catch(e){
      return  res.status(400).send({
         message: "Failed to process bill split"
      })
    }
}

