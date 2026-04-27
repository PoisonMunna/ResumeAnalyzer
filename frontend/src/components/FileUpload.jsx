import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ file, onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  }, [onFileChange]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Check if it's a docx
    if (
      selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      selectedFile.name.endsWith('.docx') || selectedFile.name.endsWith('.doc')
    ) {
      onFileChange(selectedFile);
    } else {
      alert('Please upload a valid Word document (.docx or .doc)');
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <div 
      className={`file-upload-container ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !file && document.getElementById('fileInput').click()}
    >
      <input 
        type="file" 
        id="fileInput" 
        className="hidden-input" 
        accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
        onChange={handleFileInput}
      />
      
      {!file ? (
        <div className="upload-prompt">
          <div className="icon-circle">
            <UploadCloud size={32} />
          </div>
          <h3>Click or drag to upload</h3>
          <p>Word Document (.docx)</p>
        </div>
      ) : (
        <div className="file-info">
          <div className="file-icon-wrapper">
            <File size={28} className="file-icon" />
          </div>
          <div className="file-details">
            <span className="file-name">{file.name}</span>
            <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <button className="clear-btn" onClick={clearFile} aria-label="Remove file">
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
