# 🌟 ResumeAI - ATS Resume Analyzer

Welcome to **ResumeAI**, an intelligent, AI-powered resume analyzer designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). By leveraging the advanced capabilities of Google's **Gemini AI**, this application evaluates your resume against industry-standard ATS criteria and tailored job descriptions, providing you with a compatibility score and actionable feedback.

---

## ✨ Key Features

- **📄 Seamless Document Parsing:** Upload your resume in `.docx` format, and the application will instantly extract the text using `mammoth`.
- **🤖 AI-Powered Analysis:** Utilizes the cutting-edge `gemini-2.5-flash` model to perform a deep analysis of your resume content.
- **🎯 Tailored Job Matching:** (Optional) Paste a job description to receive a targeted evaluation of how well your resume matches the specific role.
- **📊 Smart ATS Scoring:** Generates a reliable score (out of 100) indicating your resume's strength and ATS compatibility.
- **💡 Actionable Suggestions:** Provides 3-5 specific, practical recommendations to enhance your resume and increase your chances of passing ATS filters.
- **🎨 Modern & Responsive UI:** A clean, intuitive, and visually appealing interface built with React and styled for the modern web.

---

## 🛠️ Tech Stack

### Frontend 💻
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend ⚙️
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **File Handling:** [Multer](https://github.com/expressjs/multer) (In-memory storage)
- **Document Parsing:** [Mammoth](https://github.com/mwilliamson/node-mammoth)

### Artificial Intelligence 🧠
- **Provider:** [Google Generative AI (Gemini)](https://ai.google.dev/)

---

## 📁 Project Structure

This project is organized as a monorepo containing both the client and server applications:

- `/frontend` - The React application providing the user interface.
- `/backend` - The Express server managing file uploads, CORS, and the Gemini API integration.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites 📋
- **Node.js** (v18 or higher recommended)
- A **Google Gemini API Key** (You can get one from Google AI Studio)

### 1️⃣ Installation

Clone the repository and navigate into the project directory:
```bash
git clone <your-repository-url>
cd ResumeAnalysis
```

Install dependencies for the backend:
```bash
cd backend
npm install
```

Install dependencies for the frontend:
```bash
cd ../frontend
npm install
```

### 2️⃣ Configuration

The project uses `.env` files to securely manage configurations and API keys.

**Backend Setup (`backend/.env`):**
Create a `.env` file in the `backend` directory:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
```

**Frontend Setup (`frontend/.env`):**
Create a `.env` file in the `frontend` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 3️⃣ Running the Application

You need to run both the frontend and backend servers simultaneously to use the application.

**Start the Backend Server 🔌:**
```bash
cd backend
npm run dev
```
*(The server will run on `http://localhost:5000`)*

**Start the Frontend Client 🖥️:**
```bash
cd frontend
npm run dev
```
*(The React app will run on `http://localhost:5173`)*

---

## 💡 How to Use

1. Open your browser and navigate to `http://localhost:5173`.
2. Click to upload your resume (must be a valid `.docx` file).
3. **Optional but Recommended:** Paste the job description you are applying for into the text area for more accurate results.
4. Click **"Analyze Resume 🌟"**.
5. Review your ATS Score and apply the AI-generated suggestions to improve your resume!

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author
[**MAYANK ⭐** ](https://github.com/PoisonMunna)

---
*Powered by Gemini AI*
