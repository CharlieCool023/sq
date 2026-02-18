// Team member data - concise professional profiles for company website

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
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    slug: 'qusim-salawudeen',
    name: 'Qusim Adekunle SALAWUDEEN',
    title: 'Consultant',
    shortBio: 'Strategic leader with 15+ years in business consulting and transformation.',
    fullBio: 'Qusim leads SQ Consulting with a vision to transform businesses across Africa. With over 15 years of experience, he has guided hundreds of organizations through strategic transformations, operational improvements, and growth initiatives.\n\nHis expertise spans business strategy, operational excellence, and corporate transformation, making him a trusted advisor to senior leadership teams across various industries.',
    image: '/images/team-1.jpeg',
    linkedin: 'http://www.linkedin.com/in/qusim-salawudeen-906ba468/',
    email: 'qusimsalawudeen@gmail.com',
  },
  {
    id: '2',
    slug: 'hasta-salem',
    name: 'Hasta Salem',
    title: 'Chief Strategist',
    shortBio: 'Expert in market expansion and growth strategy for African businesses.',
    fullBio: 'Hasta brings deep expertise in market expansion and business development across African markets. She leads our strategic growth practice, helping clients identify new opportunities and execute successful market entry strategies.\n\nHer analytical approach and understanding of African consumer dynamics have been instrumental in driving growth for both local and international clients.',
    image: '/images/team-2.jpg',
    linkedin: 'https://www.linkedin.com/in/salemhastanuella/',
    email: 'mzsalemh@gmail.com',
  },
  {
    id: '3',
    slug: 'ibrahim-mohammed',
    name: 'Ibrahim Mohammed',
    title: 'Technology Lead',
    shortBio: 'Digital transformation specialist with expertise in ERP and cloud solutions.',
    fullBio: 'Ibrahim heads our technology practice, guiding organizations through their digital transformation journeys. He specializes in leveraging technology to drive business value, from ERP implementations to cloud strategies.\n\nWith extensive experience in enterprise technology, he helps clients modernize their operations and embrace digital capabilities.',
    image: '/images/team-3.jpg',
    linkedin: '#',
    email: 'ibrahim@sqconsulting.com',
  },
  {
    id: '4',
    slug: 'ngozi-eze',
    name: 'Ngozi Eze',
    title: 'Operations Manager',
    shortBio: 'Process optimization expert focused on operational excellence.',
    fullBio: 'Ngozi manages our operations, ensuring seamless delivery of consulting services. Her expertise in process optimization and operational excellence helps clients achieve efficiency and cost-effectiveness.\n\nShe brings a systematic approach to improving business processes, resulting in significant improvements for our clients.',
    image: '/images/team-4.jpg',
    linkedin: '#',
    email: 'ngozi@sqconsulting.com',
  },
];

// Helper function to get team member by slug
export const getTeamMemberBySlug = (slug: string): TeamMember | undefined => {
  return teamMembers.find(member => member.slug === slug);
};
