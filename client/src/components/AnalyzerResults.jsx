function scoreTone(score) {
  if (score >= 80) {
    return 'is-strong';
  }

  if (score >= 60) {
    return 'is-medium';
  }

  return 'is-low';
}

function AnalyzerResults({ analysis, onReset }) {
  const { results } = analysis;
  const { bestFit, allRoles, customAnalysis } = results;

  return (
    <section className="analyzer-results">
      <div className="analyzer-results-header">
        <button type="button" className="analyzer-secondary-btn" onClick={onReset}>
          Upload another resume
        </button>
      </div>

      <div className="analyzer-results-grid">
        <article className="analyzer-panel analyzer-highlight-panel">
          <p className="analyzer-eyebrow">Best fit role</p>
          <h2>{bestFit.roleTitle}</h2>

          <div className={`analyzer-score-ring ${scoreTone(bestFit.score)}`}>
            <span>{bestFit.score}%</span>
          </div>

          <p className="analyzer-caption">ATS match score based on your uploaded resume and our role library.</p>

          <div className="analyzer-skill-columns">
            <div>
              <h3>Matched skills</h3>
              <div className="analyzer-tag-list">
                {bestFit.matchedSkills.length > 0 ? bestFit.matchedSkills.map((skill) => (
                  <span key={skill} className="analyzer-tag analyzer-tag-match">{skill}</span>
                )) : <span className="analyzer-empty-state">No direct skill matches found yet.</span>}
              </div>
            </div>

            <div>
              <h3>Recommended next</h3>
              <div className="analyzer-tag-list">
                {bestFit.missingSkills.length > 0 ? bestFit.missingSkills.map((skill) => (
                  <span key={skill} className="analyzer-tag analyzer-tag-missing">{skill}</span>
                )) : <span className="analyzer-empty-state">You already cover the required skill set.</span>}
              </div>
            </div>
          </div>
        </article>

        <div className="analyzer-sidebar">
          {customAnalysis && (
            <article className="analyzer-panel analyzer-custom-panel">
              <p className="analyzer-eyebrow">Custom job match</p>
              <div className="analyzer-custom-score-row">
                <strong>{customAnalysis.score}%</strong>
                <span>{customAnalysis.matchedSkills.length} matched skills</span>
              </div>
              <p className="analyzer-caption">Comparison against the job description you provided.</p>
            </article>
          )}

          <article className="analyzer-panel">
            <p className="analyzer-eyebrow">Other recommended roles</p>
            <div className="analyzer-role-list">
              {allRoles.map((role) => (
                <div key={role.roleId} className="analyzer-role-item">
                  <div>
                    <h3>{role.roleTitle}</h3>
                    <p>{role.matchedSkills.length} matched skills</p>
                  </div>
                  <strong className={scoreTone(role.score)}>{role.score}%</strong>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AnalyzerResults;
