const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mammoth = require('mammoth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Configure Multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const jobDescription = req.body.jobDescription || '';

        // Extract text using mammoth
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        const resumeText = result.value;

        if (!resumeText.trim()) {
            return res.status(400).json({ error: 'Could not extract text from the document. Please ensure it is a valid .docx file.' });
        }

        // Prepare the prompt for Gemini
        const prompt = `
        You are an expert Applicant Tracking System (ATS) and a senior technical recruiter. 
        I will provide you with a candidate's resume text, and optionally a job description.
        Your task is to analyze the resume against standard ATS criteria and the job description (if provided).
        
        Job Description:
        ${jobDescription ? jobDescription : 'No specific job description provided. Evaluate against general best practices for modern professional resumes.'}

        Resume Text:
        ${resumeText}

        Please analyze the resume and provide the output in STRICT JSON format with exactly two keys:
        1. "score": An integer between 0 and 100 representing the ATS compatibility and overall strength of the resume.
        2. "suggestions": An array of strings, where each string is a specific, actionable suggestion on how to improve the resume to increase the ATS score and appeal to recruiters. Provide 3 to 5 strong suggestions.

        Output ONLY the JSON object. Do not include markdown formatting like \`\`\`json or any other text.
        `;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const aiResult = await model.generateContent(prompt);
        const responseText = aiResult.response.text();
        
        // Clean up the response to ensure it's valid JSON (sometimes Gemini adds markdown)
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const analysisData = JSON.parse(cleanedText);

        res.json({
            score: analysisData.score,
            suggestions: analysisData.suggestions,
            extractedTextSnippet: resumeText.substring(0, 200) + '...' // For debugging/verification
        });

    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).json({ error: 'An error occurred while analyzing the resume.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
