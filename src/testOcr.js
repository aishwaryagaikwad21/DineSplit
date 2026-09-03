import fs from "fs";
import { extractTextFromImage } from "./services/ocrService.js";

const image = fs.readFileSync("./src/the_green_bowl.png");

const text = await extractTextFromImage(image);

console.log("----- OCR RESULT -----");
console.log(text);