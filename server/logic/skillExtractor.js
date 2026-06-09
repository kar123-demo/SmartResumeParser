const SKILL_DICTIONARY = {
  html: ['html', 'html5'],
  css: ['css', 'css3', 'scss', 'sass', 'less'],
  javascript: ['javascript', 'js', 'es6'],
  typescript: ['typescript', 'ts'],
  react: ['react', 'reactjs', 'react.js'],
  angular: ['angular', 'angularjs'],
  vue: ['vue', 'vuejs'],
  redux: ['redux'],
  tailwind: ['tailwind', 'tailwindcss'],
  bootstrap: ['bootstrap'],
  nodejs: ['node', 'nodejs', 'node.js'],
  express: ['express', 'expressjs'],
  python: ['python', 'py'],
  django: ['django'],
  flask: ['flask'],
  java: ['java'],
  spring: ['spring', 'springboot', 'spring boot'],
  'c#': ['c#', 'csharp'],
  '.net': ['.net', 'dotnet'],
  sql: ['sql', 'mysql', 'postgresql', 'postgres'],
  nosql: ['nosql'],
  mongodb: ['mongo', 'mongodb'],
  aws: ['aws', 'amazon web services'],
  azure: ['azure'],
  docker: ['docker'],
  kubernetes: ['kubernetes', 'k8s'],
  git: ['git', 'github', 'gitlab'],
  jenkins: ['jenkins'],
  linux: ['linux'],
  pandas: ['pandas'],
  numpy: ['numpy'],
  tensorflow: ['tensorflow', 'tf'],
  pytorch: ['pytorch'],
  excel: ['excel', 'ms excel'],
  communication: ['communication'],
  leadership: ['leadership'],
  'problem solving': ['problem solving'],
  teamwork: ['teamwork'],
};

function extractSkills(normalizedText) {
  const foundSkills = new Set();

  Object.keys(SKILL_DICTIONARY).forEach((skillKey) => {
    const variants = SKILL_DICTIONARY[skillKey];
    const isMatch = variants.some((variant) => {
      const escapedVariant = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedVariant}\\b`, 'i');
      return regex.test(normalizedText);
    });

    if (isMatch) {
      foundSkills.add(skillKey);
    }
  });

  return Array.from(foundSkills);
}

module.exports = {
  extractSkills,
  SKILL_DICTIONARY,
};
