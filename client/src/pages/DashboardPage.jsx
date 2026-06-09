import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [hasResume, setHasResume] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const checkResume = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/resume`, {
          headers: { 'x-auth-token': token }
        }).catch(err => {
            console.log("Backend offline, falling back to local simulation.");
            return null; // Local simulation fallback
        });

        if (res && res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setHasResume(true);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkResume();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEdit = () => {
    navigate('/builder');
  };

  const handleAnalyze = () => {
    navigate('/analyzer');
  };

  if (loading) return <div className="dashboard-container"><div className="dashboard-content">Loading...</div></div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>SmartResume</h1>
        </Link>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <main>
        <div className="dashboard-hero">
          <h2>Welcome back, Champion!</h2>
          <p>Select a module below to optimize your career profile and get hired faster.</p>
        </div>

        <div className="dashboard-content">
          <div className="resume-grid">
          {/* Module 1: Resume Builder */}
          <div className="resume-card">
            <div className="resume-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="resume-title">Resume Builder</h3>
            <span className="resume-status">{hasResume ? "Saved to Cloud" : "Draft (Local)"}</span>
            <div className="card-actions">
              <button className="btn-edit" onClick={handleEdit}>
                {hasResume ? "Edit Resume" : "Create Resume"}
              </button>
            </div>
          </div>

        

          {/* Module 3: Analyse Resume */}
          <div className="resume-card module-card">
            <div className="resume-icon" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="resume-title">Analyse Resume</h3>
            <p className="module-desc">Verify if your resume has the exact keywords required to pass strict ATS filters</p>
            <div className="card-actions" style={{ marginTop: 'auto' }}>
               <button className="btn-secondary module-launch-btn" onClick={handleAnalyze}>Run Analysis</button>
            </div>
          </div>

        </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
