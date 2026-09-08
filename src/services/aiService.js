import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const extractDishDetails = async (ocrText) => {

    const prompt = `
    You are extracting structured data from a restaurant bill.

    Extract:
    1. Purchased dishes
    2. Additional charges
    3. Discount

    For every dish return:
    - dishName
    - price
    - quantity

    Rules for dishes:
    1. Include only purchased food or beverage items.
    2. Do not include subtotal, additional charges, discount or grand total as dishes.
    3. price means the price of ONE unit.
    4. quantity must be a number.

    Rules for additional charges:
    1. Extract every additional charge shown on the bill individually.
    2. Use the name shown on the bill as the key.
    3. Examples include CGST, SGST, GST, service charge, service tax, tip,
       delivery charge, packaging charge, platform fee, etc.
    4. If CGST and SGST are shown separately, keep them as separate charges.
    5. Do not include subtotal, discount or grand total as an additional charge.
    6. If there are no additional charges, return an empty object.

    Rules for discount:
    1. Extract the discount percentage if it is explicitly shown.
    2. Extract the actual discount amount.
    3. If no discount is present, return:
       {
           "percent": "0%",
           "amount": 0
       }
    4. Do not calculate or invent a discount percentage.

    General rules:
    1. Correct obvious OCR mistakes only when the meaning is unambiguous.
    2. Do not invent information.
    3. Return JSON only.

    Return data in exactly this structure:

    {
        "dishes": [
            {
                "dishName": "string",
                "price": number,
                "quantity": number
            }
        ],
        "additionalCharges": {
            "chargeName": number
        },
        "discount": {
            "percent": "string",
            "amount": number
        }
    }

    OCR TEXT:

    ${ocrText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
    });

    return response.text;
};

//gemini-3.5-flash-lite