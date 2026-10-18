# DineSplit 🍽️

**Split restaurant bills without the awkward math.**

DineSplit is a full-stack web application that makes splitting restaurant bills easier. Users can upload an image of their bill for AI-assisted extraction or enter the details manually when automated extraction is unavailable. They can then divide the bill equally or assign individual dishes to the people who ordered them.

DineSplit is accessible through mobile and desktop browsers and supports downloading bill-splitting details as a PDF.

🔗 **Live Demo:** https://creative-genie-894a38.netlify.app/  
💻 **GitHub Repository:** https://github.com/aishwaryagaikwad21/DineSplit

---

## ✨ Features

- **AI-Assisted Bill Extraction:** Upload a restaurant bill image and extract bill details using OCR and AI-assisted processing.
- **Manual Bill Entry:** Enter bill details manually when automated extraction is unavailable or the AI service encounters network or availability issues.
- **Equal Split:** Divide the bill total equally among all members of a group.
- **Item-wise Split:** Assign dishes to the people who ordered them and calculate individual shares.
- **Bill Breakdown:** Work with dish names, prices, quantities, additional charges, discounts, and the final bill total.
- **PDF Download:** Download the bill-splitting details as a PDF.
- **Mobile Accessibility:** Use DineSplit from a mobile phone or desktop browser.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod for data validation

### AI and Bill Processing
- Tesseract.js for optical character recognition (OCR)
- Google Gemini API for AI-assisted bill extraction

### Deployment and Tools
- Netlify for frontend hosting
- Render for backend hosting
- MongoDB Atlas for cloud database hosting
- Git and GitHub for version control
- Postman for API testing

---

## ⚙️ How It Works

### 1. Add a Bill

Upload an image of a restaurant bill or enter the bill details manually.

### 2. Extract or Enter Bill Details

For uploaded bills, OCR and AI-assisted processing help extract dish names, prices, and quantities into structured data. If the AI service is unavailable, manual entry provides an alternative.

### 3. Add Group Members

Enter the names of the people sharing the bill.

### 4. Choose a Splitting Method

- **Equal Split:** Divide the bill total equally among all members.
- **Item-wise Split:** Assign individual dishes to the people who ordered them.

### 5. Review and Download

Review the calculated individual shares, including applicable charges and discounts, and download the bill-splitting details as a PDF.

---

## 🏗️ Architecture

DineSplit uses a frontend-backend architecture:

- **React frontend:** Provides the interface for entering bill information, choosing a splitting method, and viewing individual shares.
- **Express.js API:** Handles bill operations, data validation, and split calculations.
- **MongoDB:** Stores application data using Mongoose models.
- **OCR and AI integration:** Helps convert uploaded bill images into structured bill information.

---

## 🚀 Run Locally

### Prerequisites

- Node.js and npm
- A MongoDB instance or MongoDB Atlas account
- A Google Gemini API key for AI-assisted bill extraction

### 1. Clone the repository

```bash
git clone https://github.com/aishwaryagaikwad21/DineSplit.git
cd DineSplit
```

Install dependencies in the relevant frontend and backend directories according to the project's structure.

### 2. Configure environment variables

Configure the backend environment variables in its `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

Configure the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Adjust the file locations and variable names if necessary to match the project configuration.

**Security note:** Never commit API keys, database credentials, or other secrets to GitHub. Ensure `.env` files containing secrets are included in `.gitignore`.

### 3. Start the application

Start the backend and frontend using the scripts defined in their respective `package.json` files.

Open the local frontend URL displayed by Vite in your browser.

---

## 🔐 Data Validation

- Validates extracted bill data using Zod.
- Applies backend validation to bill data and splitting inputs.
- Uses environment variables to manage sensitive configuration.

---

## 📚 Key Learnings

Developing DineSplit provided practical experience with:

- Building a full-stack application using React, Node.js, and Express.js.
- Designing REST APIs and organizing backend code.
- Modelling application data with MongoDB and Mongoose.
- Implementing equal and item-wise bill-splitting algorithms.
- Integrating OCR and generative AI into a practical application.
- Validating AI-generated data before processing it.
- Modularization: Organizing code into separate, reusable modules.
- Deploying a frontend and backend separately and connecting them to a cloud database.
- Configuring environment variables, CORS, and cloud database connectivity.
- Debugging validation and deployment issues.

---

## 🔮 Future Improvements

- Restaurant registration and menu management.
- Bill retrieval using unique bill codes.
- QR-code-based bill retrieval.
- Automated tests for bill processing and splitting.
- Further UI and usability improvements.

---

## 👩‍💻 Author

**Aishwarya Gaikwad**

---

*DineSplit is a full-stack portfolio MVP exploring AI-assisted bill extraction and practical expense-splitting workflows.*
