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
  title: 'Advisor, Finance & Performance Analyses',
  shortBio: 'Big Data Analytics and Monitoring & Evaluation specialist with 11+ years of experience in financial inclusion, credit administration, and performance management.',
  fullBio: 'Qusim Adekunle Salawudeen is a data-driven finance and performance analytics professional with over 11 years of experience spanning Big Data Analysis & Visualization, Monitoring, Evaluation & Learning (MEL), Credit Administration, and Financial Inclusion.\n\nHe currently serves as Advisor, Finance & Performance Analyses at Meristem Wealth Management Limited (Administrator of the CBN’s Nigerian Electricity Market Stabilization Facility - NEMSF), where he supports the administration of the over ₦600 billion stabilization facility in Nigeria’s power sector. He defines and implements performance management frameworks, designs automated dashboards using Microsoft Excel and Power BI, and monitors facility repayment and project performance.\n\nPreviously, he held roles including Monitoring & Evaluation Officer at Impact Credit Guarantee Limited (ICGL), Team Lead – Monitoring & Intelligence at SANEF, and Business Analyst at CRC Credit Bureau Limited. Across these roles, he led data validation, business intelligence reporting, financial inclusion monitoring, KPI tracking, and research-driven analytics initiatives.\n\nHis core strengths include advanced Excel modeling, Power BI dashboard development, performance monitoring systems design, and MEL framework implementation.',
  image: '/images/team-1.jpeg',
  linkedin: 'http://www.linkedin.com/in/qusim-salawudeen-906ba468/',
  email: 'qusimsalawudeen@gmail.com',
  expertise: [
    'Big Data Analytics & Visualization',
    'Monitoring, Evaluation & Learning (MEL)',
    'Performance Management Frameworks',
    'Financial Inclusion Monitoring',
    'Business Intelligence Reporting',
    'Microsoft Excel & Power BI',
    'Credit Administration & SME Finance'
  ],
  achievements: [
    'Administers performance monitoring for the ₦600B+ Nigerian Electricity Market Stabilization Facility (NEMSF)',
    'Designed automated performance management dashboards using Excel and Power BI',
    'Led nationwide monitoring of agent network performance under SANEF financial inclusion initiative',
    'Managed end-to-end data validation, analytics, and BI reporting at ICGL',
    'Served as analyst and project coordinator for industry publications: Credit Channel and Credit Watch'
  ],
  education: [
    'MBA, Banking & Finance – University of Nigeria (2022–2024)',
    'MSc, Actuarial Science – University of Lagos (2015–2016)',
    'BSc, Mathematics & Economics – University of Benin (2006–2010)'
  ],
  experience: [
    'Advisor, Finance & Performance Analyses – Meristem Wealth Management Limited (Sep 2022 – Present)',
    'Monitoring & Evaluation Officer – Impact Credit Guarantee Limited (Oct 2020 – Sep 2022)',
    'Team Lead, Monitoring & Intelligence – SANEF (Mar 2019 – Oct 2020)',
    'Senior Analyst, Performance Monitoring – Meristem Wealth Management Limited (Jul 2017 – Mar 2019)',
    'Business Analyst – CRC Credit Bureau Limited (Aug 2015 – Jul 2017)',
    'Executive Assistant to CEO – CRC Credit Bureau Limited (Aug 2014 – Aug 2015)'
  ],
  quote: 'Data-driven insight is the foundation of sustainable financial and institutional performance.'
    },
  {
  id: '2',
  slug: 'hasta-salem',
  name: 'Salem Hasta',
  title: 'Head of Growth & Strategy',
  shortBio: 'Growth and strategy professional with 6+ years scaling fintech and e-commerce businesses through market expansion, partnerships, and operational excellence.',
  fullBio: 'Salem H. is a growth and strategy professional with over 6 years of experience scaling fintech, e-commerce, and digital banking operations across Nigeria. She specializes in market expansion, strategic partnerships, operational optimization, and performance-driven growth execution.\n\nShe currently serves as a Strategic Growth & Retention Consultant at Hakash Limited, where she designs data-backed customer engagement frameworks, builds performance dashboards, and develops partner acquisition systems that have reduced user dormancy by 56% and increased client acquisition by 40%.\n\nPreviously, she was Head of Growth & Agency Operations Strategy at Sabi, where she led expansion across five regions, achieving 112% customer acquisition growth, 700% regional market penetration, and 60% reduction in operational costs through automation and process optimization. She also developed a five-year strategic blueprint that supported the launch of Katsupay, Katsu MFB, and Katsu Cloud.\n\nHer earlier roles at SANEF Limited and Nigeria Inter-Bank Settlement Systems (NIBSS) strengthened her expertise in financial inclusion, stakeholder management, executive coordination, and B2B onboarding at scale.\n\nSalem brings a strong blend of strategic thinking and hands-on execution, working closely with C-level executives, product teams, and field operations to deliver measurable, scalable impact.',
  image: '/images/team-2.jpg',
  linkedin: 'https://www.linkedin.com/in/salemhastanuella/',
  email: 'mzsalemh@gmail.com',
  expertise: [
    'Growth Strategy & Market Expansion',
    'Strategic Partnerships & B2B Onboarding',
    'Fintech & Digital Banking Operations',
    'Performance Dashboards & KPI Alignment',
    'Customer Acquisition & Retention Strategy',
    'Operational Optimization & Cost Reduction',
    'Stakeholder Management & Executive Support'
  ],
  achievements: [
    'Increased customer acquisition by 112% and market expansion by 80% within 12 months at Sabi',
    'Drove 700% regional market penetration across five Nigerian zones',
    'Reduced operational costs by 60% through automation and process streamlining',
    'Reduced user dormancy by 56% and increased client base by 40% at Hakash',
    'Exceeded CBN financial inclusion KPIs by 50% at SANEF',
    'Achieved 100% onboarding of all DMBs onto SANEF’s technology platform'
  ],
  education: [
    'BA, Linguistics – Obafemi Awolowo University (2011–2016)'
  ],
  experience: [
    'Strategic Growth & Retention Consultant – Hakash Limited (Aug 2021 – Present)',
    'Head of Growth & Agency Operations Strategy – Sabi (Apr 2023 – Apr 2024)',
    'Regional Growth Lead – South-South Market – Sabi (Oct 2022 – Apr 2023)',
    'Client Growth & Stakeholder Relations Manager – SANEF Limited (Jul 2019 – Jul 2021)',
    'Executive Business Operations Associate – SANEF Limited (Feb 2019 – Jun 2019)',
    'Executive Assistant – Nigeria Inter-Bank Settlement Systems PLC (Feb 2018 – Nov 2018)'
  ],
  quote: 'Sustainable growth happens at the intersection of strategy, execution, and measurable impact.'
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
