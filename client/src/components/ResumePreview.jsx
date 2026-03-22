import '../styles/ResumeStyles.css';

function ResumePreview({ resumeData }) {
  const { personalInfo, experience, education, skills, template } = resumeData;

  return (
    <div className={`resume-document template-${template || 'classic'}`}>
      <header className="resume-header">
        <h1 className="resume-name">{personalInfo.fullName}</h1>
        <div className="resume-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span>
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="resume-link">
                {personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="resume-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="resume-summary">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="experience-item">
              <div className="item-header">
                <span className="item-title">{exp.title}</span>
                <span className="item-date">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="item-subheader">{exp.company}</div>
              <ul className="item-description">
                {exp.description.split('\n').map((bullet, i) => (
                  bullet.trim() && <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Projects</h2>
          {resumeData.projects.map(proj => (
            <div key={proj.id} className="experience-item">
              <div className="item-header">
                <span className="item-title">
                  {proj.name} 
                  {proj.link && (
                    <span style={{ fontWeight: 'normal', fontSize: '10pt'}}>
                      {' | '}
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="resume-link">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </a>
                    </span>
                  )}
                </span>
                <span className="item-date">{proj.technologies}</span>
              </div>
              <ul className="item-description">
                {proj.description.split('\n').map((bullet, i) => (
                  bullet.trim() && <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="education-item">
              <div className="item-header">
                <span className="item-title">{edu.degree}</span>
                <span className="item-date">{edu.year}</span>
              </div>
              <div className="item-subheader">{edu.school}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-item">{skill}{index < skills.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ResumePreview;
