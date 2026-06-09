import { useRef, useState } from 'react';

function AnalyzerUploadSection({ customJobDescription, isLoading, onCustomJobDescriptionChange, onUpload }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndUpload = (file) => {
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      window.alert('Please upload a PDF resume.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert('Please upload a PDF smaller than 5MB.');
      return;
    }

    onUpload(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndUpload(event.dataTransfer.files?.[0]);
  };

  const handleFileSelect = (event) => {
    validateAndUpload(event.target.files?.[0]);
    event.target.value = '';
  };

  return (
    <section className={`analyzer-upload ${isDragging ? 'is-active' : ''}`}>
      <div
        className="analyzer-dropzone"
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        <div className="analyzer-dropzone-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <h2>{isLoading ? 'Analyzing your resume...' : 'Upload a resume for ATS analysis'}</h2>
        <p>Drag and drop a PDF here, or browse from your device. We analyze it instantly and keep the flow inside SmartResume.</p>

        <button
          type="button"
          className="analyzer-primary-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Choose PDF Resume'}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          hidden
          onChange={handleFileSelect}
        />

        <span className="analyzer-helper-text">PDF only, up to 5MB</span>
      </div>

      <label className="analyzer-jd-field" htmlFor="analyzer-job-description">
        <span>Optional job description</span>
        <textarea
          id="analyzer-job-description"
          value={customJobDescription}
          onChange={(event) => onCustomJobDescriptionChange(event.target.value)}
          placeholder="Paste a job description to compare your resume against a specific role."
          rows={7}
        />
      </label>
    </section>
  );
}

export default AnalyzerUploadSection;
