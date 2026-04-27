import React, { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight, RefreshCcw, Trophy, AlertTriangle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ results, onReset }) => {
  const { score, suggestions } = results;
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to target
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Determine score color based on value
  const getScoreColor = () => {
    if (score >= 80) return 'var(--success-color)';
    if (score >= 50) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  const scoreColor = getScoreColor();
  const strokeDasharray = `${(animatedScore / 100) * 283} 283`;

  return (
    <div className="dashboard-container fade-in">
      <div className="score-section glass-panel">
        <div className="score-header">
          <h2>ATS Compatibility Score</h2>
          <p>Based on industry standard Applicant Tracking Systems</p>
        </div>

        <div className="score-circle-container">
          <svg className="score-svg" viewBox="0 0 100 100">
            <circle
              className="score-circle-bg"
              cx="50" cy="50" r="45"
            />
            <circle
              className="score-circle-progress"
              cx="50" cy="50" r="45"
              style={{
                stroke: scoreColor,
                strokeDasharray: strokeDasharray,
                filter: `drop-shadow(0 0 8px ${scoreColor}80)`
              }}
            />
          </svg>
          <div className="score-value">
            <span style={{ color: scoreColor }}>{animatedScore}</span>
            <small>/100</small>
          </div>
        </div>

        <div className="score-feedback">
          {score >= 80 ? (
            <div className="feedback-badge success">
              <Trophy size={20} /> Excellent Match
            </div>
          ) : score >= 50 ? (
            <div className="feedback-badge warning">
              <CheckCircle2 size={20} /> Good, but needs work
            </div>
          ) : (
            <div className="feedback-badge danger">
              <AlertTriangle size={20} /> Needs significant improvement
            </div>
          )}
        </div>
      </div>

      <div className="suggestions-section glass-panel">
        <h2>Actionable Suggestions</h2>
        <p className="suggestions-subtitle">Implement these changes to improve your ATS ranking:</p>
        
        <ul className="suggestions-list">
          {suggestions && suggestions.map((suggestion, index) => (
            <li key={index} className="suggestion-item" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="suggestion-icon">
                <ChevronRight size={20} />
              </div>
              <div className="suggestion-text">
                {suggestion}
              </div>
            </li>
          ))}
        </ul>

        <button className="reset-btn" onClick={onReset}>
          <RefreshCcw size={18} />
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
