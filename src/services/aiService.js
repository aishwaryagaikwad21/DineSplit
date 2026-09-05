import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const extractDishDetails = async (ocrText) => {

    const prompt = `
    You are extracting structured data from a restaurant bill.

    Extract ONLY the purchased dishes.

    For every dish return:
    - dishName
    - price
    - quantity

    Rules:
    1. Do not include subtotal, tax, GST, service charges or grand total.
    2. price means the price of ONE unit.
    3. quantity must be a number.
    4. Correct obvious OCR mistakes when the meaning is unambiguous.
    5. Do not invent information.
    6. Return JSON only.



    OCR TEXT:

    ${ocrText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt
    });

    return response.text;
};

//gemini-3.5-flash-lite