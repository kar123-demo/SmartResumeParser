const { normalizeText } = require('./textProcessor');
const { extractSkills } = require('./skillExtractor');

function calculateScore(resumeSkills, jobRole) {
  const requiredSkills = jobRole.requiredSkills;

  if (!requiredSkills || requiredSkills.length === 0) {
    return { score: 0, matched: [], missing: [] };
  }

  const matched = [];
  const missing = [];

  requiredSkills.forEach((requiredSkill) => {
    if (resumeSkills.includes(requiredSkill)) {
      matched.push(requiredSkill);
    } else {
      missing.push(requiredSkill);
    }
  });

  const matchPercentage = (matched.length / requiredSkills.length) * 100;
  const finalScore = Math.round((matchPercentage * 0.9) + 10);

  return {
    roleId: jobRole.id,
    roleTitle: jobRole.title,
    score: Math.min(finalScore, 100),
    matchPercentage: Math.round(matchPercentage),
    matchedSkills: matched,
    missingSkills: missing,
  };
}

function analyzeResume(resumeSkills, resumeText, jobRoles, customJDText = null) {
  const roleMatches = jobRoles.map((role) => calculateScore(resumeSkills, role));
  roleMatches.sort((left, right) => right.score - left.score);

  let customAnalysis = null;

  if (customJDText) {
    const normalizedJobDescription = normalizeText(customJDText);
    const jdSkills = extractSkills(normalizedJobDescription);

    customAnalysis = calculateScore(resumeSkills, {
      id: 'custom-jd',
      title: 'Custom Job Description',
      requiredSkills: jdSkills,
    });
  }

  return {
    bestFit: roleMatches[0],
    allRoles: roleMatches,
    customAnalysis,
  };
}

module.exports = {
  analyzeResume,
};
