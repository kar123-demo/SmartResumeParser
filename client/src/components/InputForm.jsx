import { useState } from 'react';
import './InputForm.css';

const STEPS = ['Personal Info', 'Academics', 'Skills', 'Projects', 'Experience'];

function InputForm({ resumeData, setResumeData }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...resumeData[section]];
    newArray[index][field] = value;
    setResumeData(prev => ({
      ...prev,
      [section]: newArray
    }));
  };

  const addArrayItem = (section, emptyItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], emptyItem]
    }));
  };

  const removeArrayItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSkillsChange = (e) => {
    const val = e.target.value;
    const skillsArray = val.split(',').map(s => s.trim()).filter(s => s !== '');
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(curr => curr + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content animate-fade-in">
            <h2>Personal Details</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={resumeData.personalInfo.fullName} onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={resumeData.personalInfo.email} onChange={(e) => handleChange('personalInfo', 'email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={resumeData.personalInfo.phone} onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" value={resumeData.personalInfo.location} onChange={(e) => handleChange('personalInfo', 'location', e.target.value)} />
            </div>
            <div className="form-group">
              <label>LinkedIn / Portfolio</label>
              <input type="text" value={resumeData.personalInfo.linkedin} onChange={(e) => handleChange('personalInfo', 'linkedin', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Professional Summary</label>
              <textarea rows="4" value={resumeData.personalInfo.summary} onChange={(e) => handleChange('personalInfo', 'summary', e.target.value)}></textarea>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="step-content animate-fade-in">
            <h2>Academics</h2>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="array-item">
                <input type="text" placeholder="School / University" value={edu.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} />
                <input type="text" placeholder="Degree / Course" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                <input type="text" placeholder="Year of Passing" value={edu.year} onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)} />
                <button className="remove-btn" onClick={() => removeArrayItem('education', edu.id)}>Remove Education</button>
              </div>
            ))}
            <button className="add-btn" onClick={() => addArrayItem('education', { id: crypto.randomUUID(), school: '', degree: '', year: '' })}>+ Add Education</button>
          </div>
        );
      case 2:
        return (
          <div className="step-content animate-fade-in">
            <h2>Skills</h2>
            <div className="form-group">
              <label>Comma separated skills (e.g. JavaScript, React, System Design)</label>
              <textarea rows="4" value={resumeData.skills.join(', ')} onChange={handleSkillsChange}></textarea>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content animate-fade-in">
            <h2>Projects</h2>
            {resumeData.projects.map((proj, index) => (
              <div key={proj.id} className="array-item">
                <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} />
                <input type="text" placeholder="Technologies Used" value={proj.technologies} onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)} />
                <input type="text" placeholder="Project Link" value={proj.link} onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} />
                <textarea rows="3" placeholder="Description (Bullet points separated by new lines)" value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}></textarea>
                <button className="remove-btn" onClick={() => removeArrayItem('projects', proj.id)}>Remove Project</button>
              </div>
            ))}
            <button className="add-btn" onClick={() => addArrayItem('projects', { id: crypto.randomUUID(), name: '', technologies: '', link: '', description: '' })}>+ Add Project</button>
          </div>
        );
      case 4:
        return (
          <div className="step-content animate-fade-in">
            <h2>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="array-item">
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
                <div className="date-group">
                  <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                  <input type="text" placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} />
                </div>
                <textarea rows="3" placeholder="Description (Bullet points separated by new lines)" value={exp.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}></textarea>
                <button className="remove-btn" onClick={() => removeArrayItem('experience', exp.id)}>Remove Experience</button>
              </div>
            ))}
            <button className="add-btn" onClick={() => addArrayItem('experience', { id: crypto.randomUUID(), company: '', title: '', startDate: '', endDate: '', description: '' })}>+ Add Experience</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="input-form">
      <div className="template-selector">
        <h3>Select ATS Template</h3>
        <div className="template-options">
          <div 
            className={`template-card ${(!resumeData.template || resumeData.template === 'classic') ? 'active' : ''}`}
            onClick={() => setResumeData(prev => ({ ...prev, template: 'classic' }))}
          >
            <span className="template-name">Classic</span>
            <span className="template-desc">Standard Header</span>
          </div>
          <div 
            className={`template-card ${resumeData.template === 'modern' ? 'active' : ''}`}
            onClick={() => setResumeData(prev => ({ ...prev, template: 'modern' }))}
          >
            <span className="template-name">Modern</span>
            <span className="template-desc">Bold Accents</span>
          </div>
          <div 
            className={`template-card ${resumeData.template === 'compact' ? 'active' : ''}`}
            onClick={() => setResumeData(prev => ({ ...prev, template: 'compact' }))}
          >
            <span className="template-name">Compact</span>
            <span className="template-desc">Dense 1-Page</span>
          </div>
        </div>
      </div>

      <div className="stepper">
        {STEPS.map((step, index) => (
          <div key={index} className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
            {step}
          </div>
        ))}
      </div>
      
      <div className="form-body">
        {renderStepContent()}
      </div>

      <div className="form-actions">
        <button 
          className="btn-secondary" 
          onClick={prevStep} 
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button 
          className="btn-primary" 
          onClick={nextStep} 
          disabled={currentStep === STEPS.length - 1}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default InputForm;
