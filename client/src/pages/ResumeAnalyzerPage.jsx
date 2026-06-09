import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyzerResults from '../components/AnalyzerResults';
import AnalyzerUploadSection from '../components/AnalyzerUploadSection';
import './ResumeAnalyzerPage.css';

function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
}

function ResumeAnalyzerPage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [customJobDescription, setCustomJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const featureCards = useMemo(() => [
    {
      title: 'Role fit scoring',
      description: 'See which role your resume maps to best based on extracted technical skills.',
    },
    {
      title: 'Custom JD comparison',
      description: 'Paste a job description and get an immediate comparison without leaving the app.',
    },
    {
      title: 'Actionable gaps',
      description: 'Surface the missing keywords and skills that are most likely to help your next application.',
    },
  ], []);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('resume', file);

    if (customJobDescription.trim()) {
      formData.append('customJobDescription', customJobDescription.trim());
    }

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json') ? await response.json() : null;

      if (!response.ok) {
        throw new Error(payload?.error || payload?.msg || 'Resume analysis failed.');
      }

      setAnalysisResult(payload);
    } catch (error) {
      console.error('Resume analysis failed', error);
      setErrorMessage(error.message || 'Resume analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyzer-page">
      <header className="analyzer-page-header">
        <div>
          <Link to="/dashboard" className="analyzer-brand">SmartResume</Link>
          <p>Resume Analyzer</p>
        </div>

        <div className="analyzer-header-actions">
          <Link to="/dashboard" className="analyzer-secondary-btn">Back to dashboard</Link>
          <Link to="/builder" className="analyzer-primary-btn">Open builder</Link>
        </div>
      </header>

      <main className="analyzer-page-content">
        {!analysisResult ? (
          <>
            <section className="analyzer-hero">
              <div>
                <p className="analyzer-eyebrow"></p>
                <h1>Analyze, compare, and refine your resume in one workspace.</h1>
                <p className="analyzer-hero-copy">
                  This combines the original builder workflow with the smart resume analyzer so you can upload a PDF, check ATS alignment, and jump back into editing without leaving the main app.
                </p>
              </div>
            </section>

            <AnalyzerUploadSection
              customJobDescription={customJobDescription}
              isLoading={isLoading}
              onCustomJobDescriptionChange={setCustomJobDescription}
              onUpload={handleUpload}
            />

            {errorMessage ? <div className="analyzer-error-banner">{errorMessage}</div> : null}

            <section className="analyzer-feature-grid">
              {featureCards.map((feature) => (
                <article key={feature.title} className="analyzer-panel">
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </article>
              ))}
            </section>
          </>
        ) : (
          <AnalyzerResults
            analysis={analysisResult}
            onReset={() => {
              setAnalysisResult(null);
              setErrorMessage('');
            }}
          />
        )}
      </main>
    </div>
  );
}

export default ResumeAnalyzerPage;
