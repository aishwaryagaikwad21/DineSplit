import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const extractDishDetails = async (ocrText) => {

    const prompt = `
    You are extracting structured data from a restaurant bill.

    Extract:
    1. Purchased dishes and their totals
    2. Sub-Total
    3. Additional charges
    4. Discount
    5. Total/ Grand total / final total

    For every dish return:
    - dishName
    - price
    - quantity
    - total

    Rules for dishes:
    1. Include only purchased food or beverage items.
    2. Do not include subtotal, additional charges, discount, tax, GST, service charge or grand total as dishes.
    3. price means the price of ONE unit exactly as shown on the bill.
    4. quantity must be a number.
    5. total means the line-item total explicitly shown on the bill.
    6. Do NOT calculate or invent total if it is not shown.
    7. If the bill does not show a line-item total, return 0 for total.
    8. Keep separate bill lines separate, even when the dish names are identical.
    9. If the same dish appears multiple times with different prices or quantities, return each occurrence as a separate dish.

    Rules for Sub-Total:
    1. Extract Sub-Total explicitly shown on the bill
    2. Do not include discount, additional charges, or grand total as sub-total
    3. If there is no Sub-Total shown, return 0
    4. Do NOT calculate or invent the Sub-Total

    Rules for additional charges:
    1. Extract every additional charge shown on the bill individually.
    2. Use the exact charge name shown on the bill as the key.
    3. Examples include CGST, SGST, GST, service charge, service tax, VAT, tip,
       delivery charge, packaging charge, platform fee, etc.
    4. If CGST and SGST are shown separately, keep them as separate charges.
    5. Do not combine separate charges into a single charge. 
    6. Do not include subtotal, discount or grand total as an additional charge.
    7. Extract the exact numerical amount shown on the bill.
    8. Do NOT calculate or infer an additional charge.
    9. If there are no additional charges, return an empty object.

    Rules for discount:
    1. Extract the discount percentage if it is explicitly shown.
    2. Extract the actual discount amount.
    3. Do NOT calculate or invent a discount percentage.
    4. Do NOT calculate or invent a discount amount.
    5. If no discount is present, return:
       {
           "percent": "0%",
           "amount": 0
       }
    6. Do not calculate or invent a discount percentage.

    Rules for Grand Total:
    1. Extract the final/grand/total amount explicitly shown on the bill.
    2. 2. The final amount may be labelled as: Grand Total, Gross Amount, Net Amount, Net Payable, Amount Payable, Payable Amount, Total, Final Amount, or another label clearly indicating the final amount due.
    3. The value must be the final amount payable by the customer.
    4. Do not assume that the field must be labelled "Grand Total".
    5. Do not use Sub-Total as Grand Total unless the bill explicitly shows that the Sub-Total is also the final amount.
    6. Do not calculate or invent the Grand Total.
    7. If no Grand Total or final payable amount is shown, return 0.

    General rules:
    1. Preserve every purchased bill line.
    2. Do not merge duplicate dishes. 
    3. Correct obvious OCR mistakes only when the meaning is unambiguous.
    4. Never guess a missing price, quantity, total, charge, subtotal, or discount.
    5. If a value is not explicitly present, use the specified default value.
    6. Return JSON only.

    Return data in exactly this structure:

    {
        "dishes": [
            {
                "dishName": "string",
                "price": number,
                "quantity": number,
                "itemTotal": number
            }
        ],
        "subtotal": number,
        "additionalCharges": {
            "chargeName": number
        },
        "discount": {
            "percent": "string",
            "amount": number
        },
        "grandTotal": number
    }

    OCR TEXT:

    ${ocrText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt
    });

    return response.text;
};

//gemini-3.5-flash-lite