export interface EducationEntry {
  period: string
  degree: string
  campus: string
  abbreviation: string
  score: string
  description: string
}

export const education: EducationEntry[] = [
  {
    period: '2019 - 2023',
    degree: 'Bachelor of Science in Computer Science',
    campus: 'Federal Urdu University of Arts, Science & Technology (FUUAST)',
    abbreviation: 'BSCS',
    score: '3.4 / 4.0 CGPA',
    description:
      'Comprehensive study in software engineering, cloud computing, algorithms, and modern development practices. Specialized in DevOps and full-stack development.',
  },
  {
    period: '2017 - 2019',
    degree: 'Intermediate in Computer Science',
    campus: 'Govt. College For Men Nazimabad, Karachi',
    abbreviation: 'BIEK',
    score: 'B Grade',
    description:
      'Focused on practical applications of information technology including software development, database management, and network administration.',
  },
  {
    period: '2016 - 2017',
    degree: 'Matriculation in Computer Science',
    campus: 'Karachi Cambridge School',
    abbreviation: 'BSEK',
    score: 'A+ Grade',
    description:
      'Strong foundation in computer science fundamentals, mathematics, and practical IT skills. Graduated with top honors.',
  },
]
