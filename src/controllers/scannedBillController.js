import { ScannedBill } from "../models/scanbill.js";
import { ScannedSplit } from "../models/scannedsplit.js";
import { extractTextFromImage } from "../services/ocrService.js";
import { extractDishDetails } from "../services/aiService.js";
import { extractedBill } from "../validators/scannedBillValidator.js";
import { splitScannedBill } from "../services/splitScannedBill.js";

const cleanJson = (text) => {

    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};


export const scanBill = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).send({message: "Bill image is required"});
        }

        const ocrText = await extractTextFromImage(req.file.buffer)
        //console.log("OCR TEXT:");
        //console.log(ocrText);

        //send OCR text to AI
        const aiResponse = await extractDishDetails(ocrText)
        //console.log("AI RESPONSE:");
        //console.log(aiResponse);
        if(!aiResponse){
           return res.status(400).send({
            message: "Unable to extract bill details"
           })
        }

        //parse JSON
        const parsedResponse = JSON.parse(cleanJson(aiResponse))

        // //zod validation
        const validationResult = extractedBill.safeParse(parsedResponse)

        if (!validationResult.success) {

            return res.status(422).send({
                message: "AI returned invalid bill data",
                errors: validationResult.error.issues
            });
        }

        const parsedBill = validationResult.data  //client will store it temporarily/ maintain a State

        return res.status(200).send(parsedBill)

    }
    catch(err){
        console.error(err);

        return res.status(500).send({
            message: "Something went wrong"
        });
    }
}

export const confirmBill = async (req, res) => {
    
    const result = extractedBill.safeParse(req.body)
    if(!result.success){
        return res.status(400).send({
            message: 'Invalid inputs',
            errors: result.error.issues
        })
    }

    const {
        dishes,
        additionalCharges,
        discount
    } = result.data

    try{
        const billDetails = new ScannedBill({
            dishes,
            additionalCharges,
            discount
        })

        await billDetails.save();

        return res.status(201).send({
            message: "Bill confirmed successfully",
            bill: billDetails
        });
    }
    catch(err){
        return res.status(500).send({
            message: "Failed to create bill"
        });
    }
}

export const getBill = async (req, res) => {
    const id = req.params.id
    try{
        const bill = await ScannedBill.findById({_id: id})

        if(!bill){
            return res.status(404).send('Not found')
        }

        res.status(200).send(bill)
    }
    catch(err){
        res.status(500).send(err)
    }
}

export const splitDetails = async(req, res) => {

    const id = req.params.id
    const bill = await ScannedBill.findById({_id: id})

    if(!bill){
       return res.status(404).send('Bill not found')
    }

    const {
        totalMembers,
        splitType,
        memNames, 
        dishDetails
    } = req.body

    const splitExists = await ScannedSplit.findOne({billId: bill._id})
    if(splitExists){
        return res.status(400).send('Split already exists! can only update')
    }

    const splitScannedBillSaved = await splitScannedBill({
        bill,
        totalMembers,
        splitType,
        memNames,
        dishDetails
    })

    res.status(200).send(splitScannedBillSaved)
}


export const finalSplitBill = async (req, res) => {

    const id = req.params.id
    try{
        const bill = await ScannedSplit.findOne({billId: id})
        if(!bill){
            return res.status(404).send('Not Found')
        }

        res.status(200).send(bill)
    }
    catch(err){
        return res.status(500).send(err)
    }
}