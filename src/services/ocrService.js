import { createWorker } from "tesseract.js";

export const extractTextFromImage = async (imageBuffer) => {

    const worker = await createWorker("eng");

    try {

        const { data } = await worker.recognize(imageBuffer);

        return data.text;

    } finally {

        await worker.terminate();

    }
};