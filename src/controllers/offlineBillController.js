import { OfflineBill } from "../models/offlinebill.js";
import { extractTextFromImage } from "../services/ocrService.js";
import { extractDishDetails } from "../services/aiService.js";
import { extractedDishesSchema } from "../validators/offlineBillValidator.js";

const cleanJson = (text) => {

    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};


export const scanOfflineBill = async (req, res) => {
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

        //parse JSON
        const parsedResponse = JSON.parse(cleanJson(aiResponse))

        //zod validation
        const validationResult = extractedDishesSchema.safeParse(parsedResponse)

        if (!validationResult.success) {

            return res.status(422).send({
                message: "AI returned invalid bill data",
                errors: validationResult.error.issues
            });
        }

        const extractedDishes = validationResult.data

        //Calculate itemTotal 
        const dishes = extractedDishes.map((dish) => {

            const itemTotal = Number(
                (dish.price * dish.quantity).toFixed(2)
            );

            return {
                dishName: dish.dishName,
                price: dish.price,
                quantity: dish.quantity,
                itemTotal
            };
        });

        //Calculate subtotal 
         const subtotal = Number(dishes.reduce((sum, dish) => sum + dish.itemTotal, 0).toFixed(2));

         //Calculate tax
         const taxRate = 0.05
         const tax = Number((subtotal * taxRate).toFixed(2))

         //Calculate grand total
         const grandTotal = Number((subtotal + tax).toFixed(2))

         //create OfflineBill document
         const offlineBill = new OfflineBill({
            dishes,
            subtotal,
            tax,
            grandTotal
        });

        await offlineBill.save();

        return res.status(201).send({
            message: "Offline bill processed successfully",
            data: offlineBill
        });
    }
    catch(err){
        console.error(err);

        return res.status(500).send({
            message: "Failed to process offline bill"
        });
    }
}

export const getBill = async (req, res) => {
    const id = req.params.id
    try{
        const bill = await OfflineBill.findById({_id: id})

        if(!bill){
            return res.status(404).send('Not found')
        }
        
        res.status(200).send(bill)
    }
    catch(err){
        res.status(500).send(err)
    }
}