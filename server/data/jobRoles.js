const jobRoles = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    description: 'Build responsive and interactive user interfaces using modern web technologies.',
    requiredSkills: ['html', 'css', 'javascript', 'react', 'redux', 'typescript', 'tailwind', 'bootstrap', 'git'],
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    description: 'Design and implement server-side logic, databases, and APIs.',
    requiredSkills: ['nodejs', 'express', 'python', 'django', 'java', 'spring', 'sql', 'mongodb', 'docker', 'aws'],
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer',
    description: 'Handle both client-side and server-side development.',
    requiredSkills: ['javascript', 'react', 'nodejs', 'express', 'mongodb', 'sql', 'git', 'docker', 'aws'],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Analyze data to derive business insights.',
    requiredSkills: ['python', 'sql', 'excel', 'pandas', 'numpy'],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Manage infrastructure and deployment pipelines.',
    requiredSkills: ['aws', 'docker', 'kubernetes', 'jenkins', 'linux', 'git'],
  },
];

module.exports = {
  getJobRoles: () => jobRoles,
};
