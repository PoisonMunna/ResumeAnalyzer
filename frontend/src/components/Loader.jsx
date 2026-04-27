import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [loadingText, setLoadingText] = useState('Analyzing your resume...');

  useEffect(() => {
    const texts = [
      'Extracting skills...',
      'Matching keywords...',
      'Calculating ATS score...',
      'Generating suggestions...'
    ];
    let i = 0;
    const intervalId = setInterval(() => {
      setLoadingText(texts[i]);
      i = (i + 1) % texts.length;
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loader-container fade-in">
      <div className="hexagon-wrapper">
        <div className="hexagon">
          <div className="hex-inner"></div>
        </div>
      </div>
      <h3 className="loading-text">{loadingText}</h3>
      <p className="loading-subtext">This might take a few seconds</p>
    </div>
  );
};

export default Loader;
