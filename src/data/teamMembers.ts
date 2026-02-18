// Team member data with detailed information
// This file is shared between Team.tsx and TeamMember.tsx

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  image: string;
  linkedin: string;
  email: string;
  expertise: string[];
  achievements: string[];
  education: string[];
  experience: string[];
  quote?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    slug: 'qusim-salawudeen',
    name: 'Qusim Adekunle SALAWUDEEN',
    title: 'Senior Consultant',
    shortBio: 'Strategic leader with 15+ years in business consulting and transformation.',
    fullBio: 'Qusim Adekunle Salawudeen is a seasoned business leader and entrepreneur with over 15 years of experience in consulting, strategy, and corporate transformation. As the Managing Partner of SQ Consulting, he leads the firm\'s strategic direction and ensures delivery of exceptional value to clients across Africa.\n\nHe has worked with over 200 organizations across various sectors including banking, telecommunications, manufacturing, and retail. His expertise lies in business transformation, operational efficiency, and strategic planning.\n\nBefore founding SQ Consulting, Qusim held senior leadership positions in several multinational corporations where he successfully led major transformation initiatives that resulted in significant revenue growth and operational improvements.',
    image: '/images/team-1.jpeg',
    linkedin: 'http://www.linkedin.com/in/qusim-salawudeen-906ba468/',
    email: 'qusimsalawudeen@gmail.com',
    expertise: [
      'Business Strategy & Transformation',
      'Operational Excellence',
      'Change Management',
      'Corporate Restructuring',
      'Market Entry Strategy',
      'Leadership Development'
    ],
    achievements: [
      'Led 200+ consulting engagements across Africa',
      'Delivered over $50M in client value',
      'Built SQ Consulting from ground up to industry leader',
      'Recognized as Top Management Consultant in Nigeria 2023',
      'Speaker at African Business Summit 2022 & 2023'
    ],
    education: [
      'MBA, Strategic Management - Lagos Business School',
      'BSc, Economics - University of Lagos'
    ],
    experience: [
      'Senior Consultant, SQ Consulting (2018 - Present)',
      'Senior Consultant, McKinsey & Company (2012 - 2018)',
      'Business Development Manager, Shell Nigeria (2008 - 2012)'
    ],
    quote: 'Excellence is not a destination but a continuous journey of improvement.'
  },
  {
    id: '2',
    slug: 'hasta-salem',
    name: 'Hasta Salem',
    title: 'Chief Strategist',
    shortBio: 'Expert in market expansion and growth strategy for African businesses.',
    fullBio: 'Hasta Salem brings over 12 years of experience in strategic planning and business development, with a special focus on African markets. As Strategy Director at SQ Consulting, she oversees the development and implementation of growth strategies for clients seeking to expand their footprint across the continent.\n\nHer deep understanding of African consumer behavior, market dynamics, and regulatory environments has helped numerous international companies successfully enter and grow in African markets. She has worked with clients in over 15 African countries.\n\nHasta is known for her data-driven approach and ability to translate complex market insights into actionable growth strategies.',
    image: '/images/team-2.jpg',
    linkedin: 'https://www.linkedin.com/in/salemhastanuella/',
    email: 'mzsalemh@gmail.com',
    expertise: [
      'Market Expansion Strategy',
      'Business Development',
      'Market Research & Analytics',
      'Competitive Positioning',
      'Partnership Development',
      'Growth Strategy'
    ],
    achievements: [
      'Successfully launched 30+ products in African markets',
      'Developed market entry strategies for 5 Fortune 500 companies',
      'Increased client revenues by an average of 40%',
      'Author of "Growth Playbook for African Markets"',
      'Named Top 40 Under 40 Business Leaders in Nigeria'
    ],
    education: [
      'MSc, International Business - University of Warwick',
      'BSc, Business Administration - University of Nigeria, Nsukka'
    ],
    experience: [
      'Chief Strategist, SQ Consulting (2020 - Present)',
      'Regional Business Lead, Unilever (2016 - 2020)',
      'Market Analyst, Nestle Nigeria (2012 - 2016)'
    ],
    quote: 'Africa is not just a market—it\'s the future of global business.'
  },
  {
    id: '3',
    slug: 'ibrahim-mohammed',
    name: 'Ibrahim Mohammed',
    title: 'Technology Lead',
    shortBio: 'Digital transformation specialist with expertise in ERP and cloud solutions.',
    fullBio: 'Ibrahim Mohammed is a technology visionary with over 10 years of experience in digital transformation, enterprise systems, and technology consulting. As Technology Lead at SQ Consulting, he guides organizations through their digital transformation journeys, helping them leverage technology for competitive advantage.\n\nHe specializes in ERP implementation, cloud migration, digital strategy, and technology roadmap development. His work has helped organizations across banking, manufacturing, and retail sectors modernize their operations and achieve digital excellence.\n\nIbrahim is passionate about helping African businesses embrace digital technologies and has trained over 500 executives on digital transformation strategies.',
    image: '/images/team-3.jpg',
    linkedin: '#',
    email: 'ibrahim@sqconsulting.com',
    expertise: [
      'Digital Transformation',
      'ERP Implementation',
      'Cloud Computing',
      'Technology Strategy',
      'Process Automation',
      'IT Project Management'
    ],
    achievements: [
      'Led 50+ digital transformation projects',
      'Implemented SAP across 10+ large enterprises',
      'Achieved 60% operational efficiency improvements for clients',
      'AWS & SAP Certified Professional',
      'Tech innovator award 2022 - Nigeria Tech Awards'
    ],
    education: [
      'MSc, Computer Science - Stanford University',
      'BEng, Computer Engineering - Ahmadu Bello University'
    ],
    experience: [
      'Technology Lead, SQ Consulting (2019 - Present)',
      'Senior IT Consultant, Deloitte (2016 - 2019)',
      'Systems Analyst, Guaranty Trust Bank (2013 - 2016)'
    ],
    quote: 'Technology is the enabler of business transformation.'
  },
  {
    id: '4',
    slug: 'ngozi-eze',
    name: 'Ngozi Eze',
    title: 'Operations Manager',
    shortBio: 'Process optimization expert focused on operational excellence.',
    fullBio: 'Ngozi Eze is an operations management professional with over 11 years of experience in process optimization, supply chain management, and operational excellence. As Operations Manager at SQ Consulting, she ensures seamless delivery of consulting services while helping clients transform their operational processes.\n\nHer expertise spans process reengineering, lean six sigma, supply chain optimization, and quality management. She has helped organizations achieve significant cost reductions and efficiency improvements through systematic approach to operational excellence.\n\nNgozi is a certified Lean Six Sigma Black Belt and has facilitated numerous process improvement initiatives across various industries.',
    image: '/images/team-4.jpg',
    linkedin: '#',
    email: 'ngozi@sqconsulting.com',
    expertise: [
      'Process Optimization',
      'Lean Six Sigma',
      'Supply Chain Management',
      'Quality Management',
      'Operational Excellence',
      'Project Management'
    ],
    achievements: [
      'Delivered $15M in cost savings for clients',
      'Processed 100+ process improvement projects',
      'Certified Lean Six Sigma Black Belt',
      'Implemented ISO 9001 for 15+ organizations',
      'Best Operations Manager Award 2023 - Consulting Excellence'
    ],
    education: [
      'MBA, Operations Management - Lagos Business School',
      'BSc, Industrial Engineering - Federal University of Technology'
    ],
    experience: [
      'Operations Manager, SQ Consulting (2019 - Present)',
      'Operations Analyst, Chevron Nigeria (2016 - 2019)',
      'Process Engineer, Dangote Industries (2013 - 2016)'
    ],
    quote: 'Efficiency is doing things right; effectiveness is doing the right things.'
  }
];

// Helper function to get team member by slug
export const getTeamMemberBySlug = (slug: string): TeamMember | undefined => {
  return teamMembers.find(member => member.slug === slug);
};
