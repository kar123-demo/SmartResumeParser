import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import ResumePreview from '../components/ResumePreview';

function BuilderPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [resumeData, setResumeData] = useState({
    template: 'classic',
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      linkedin: 'linkedin.com/in/johndoe',
      location: 'New York, NY',
      summary: 'Passionate software engineer with 5+ years of experience in building scalable web applications. Strong expertise in frontend development and user experience.'
    },
    experience: [
      {
        id: crypto.randomUUID(),
        company: 'Tech Innovations Inc.',
        title: 'Senior Software Engineer',
        startDate: 'Jan 2021',
        endDate: 'Present',
        description: 'Lead the frontend team to build high-performance React applications.\nReduced load times by 40% through lazy loading and code splitting.'
      }
    ],
    education: [
      {
        id: crypto.randomUUID(),
        school: 'State University',
        degree: 'B.S. in Computer Science',
        year: '2019'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
    projects: [
      {
        id: crypto.randomUUID(),
        name: 'Smart Resume Builder',
        technologies: 'React, Node.js, Express',
        link: 'github.com/johndoe/smart-resume',
        description: 'Developed an ATS-friendly dynamic resume generator with side-by-side live preview.\nImplemented step-by-step user input form for clean data collection.'
      }
    ]
  });

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/resume', {
          headers: {
            'x-auth-token': token
          }
        }).catch(err => {
            console.log("Backend offline, continuing in local simulation mode.");
            return null;
        });
        
        if (res && res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (data && Object.keys(data).length > 0) {
              setResumeData(data);
            }
          }
        } else if (res && res.status === 401) {
            // Invalid token, kick out
            localStorage.removeItem('token');
            navigate('/');
        }
      } catch (err) {
        console.error('Error fetching layout', err);
      }
    };
    fetchResume();
  }, [navigate]);

  const saveToCloud = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setIsSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ resumeData })
      }).catch(err => {
         throw new Error('Backend Offline');
      });
      
      if (res && res.ok) {
        alert('Resume saved to cloud successfully!');
      } else {
        alert('Failed to save resume (Server Offline).');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend (Server is Offline).');
    }
    setIsSaving(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <h1>SmartResume</h1>
            <p>Dynamic ATS-Friendly Resume Generator</p>
          </Link>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={saveToCloud} disabled={isSaving} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', fontWeight: 'bold', cursor: 'pointer', border: 'none', backgroundColor: '#e0e7ff', color: '#3730a3' }}>
            {isSaving ? 'Saving...' : 'Save to Cloud'}
          </button>
          <button className="btn-download" onClick={() => window.print()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', verticalAlign: 'text-bottom'}}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
          </button>
        </div>
      </header>
      <main className="split-view">
        <section className="left-pane">
          <InputForm resumeData={resumeData} setResumeData={setResumeData} />
        </section>
        <section className="right-pane">
          <ResumePreview resumeData={resumeData} />
        </section>
      </main>
    </div>
  );
}

export default BuilderPage;
