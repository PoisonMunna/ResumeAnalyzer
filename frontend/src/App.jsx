import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { Sparkles, FileText } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first.');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.post(`${backendUrl}/api/analyze-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setResults(null);
    setError('');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Sparkles className="logo-icon" size={32} />
          <h1>Resume<span>AI</span></h1>
        </div>
        <p className="subtitle">Optimize your resume for the Applicant Tracking System</p>
      </header>

      <main className="main-content">
        {!results && !loading ? (
          <div className="upload-section glass-panel fade-in">
            <h2>Let's analyze your resume</h2>
            <p className="section-desc">Upload your Word document and optionally provide a job description for tailored feedback.</p>
            
            <FileUpload file={file} onFileChange={handleFileChange} />
            
            <div className="job-description-group">
              <label htmlFor="jobDesc">Job Description (Optional)</label>
              <textarea 
                id="jobDesc" 
                placeholder="Paste the job description here for a more accurate ATS score..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              className={`analyze-btn ${file ? 'active' : ''}`}
              onClick={handleAnalyze}
              disabled={!file}
            >
              Analyze Resume
              <Sparkles size={18} />
            </button>
          </div>
        ) : loading ? (
          <Loader />
        ) : (
          <Dashboard results={results} onReset={handleReset} />
        )}
      </main>

      <footer className="footer">
        <p>Powered by Gemini AI  | Made by MAYANK ⭐ </p>
      </footer>
    </div>
  );
}

export default App;
