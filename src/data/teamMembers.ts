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
  slug: 'charles-onah',
  name: 'Charles Onah',
  title: 'Technology & Digital Strategy Lead',
  shortBio: 'Technology strategist focused on building scalable digital systems, optimizing operations, and translating business needs into high-impact technical solutions.',
  fullBio: 'Charles leads the firm’s technology and digital strategy initiatives, working at the intersection of business objectives and technical execution. He specializes in designing scalable systems, optimizing digital operations, and implementing practical technology frameworks that drive measurable growth.\n\nWith strong expertise in system architecture, product development, and process automation, Charles helps organizations streamline workflows, improve performance visibility, and build resilient digital infrastructure. His approach blends strategic thinking with hands-on execution — ensuring technology investments directly support business outcomes.\n\nHe is particularly passionate about helping growth-stage and enterprise organizations leverage modern tools, data systems, and automation to improve efficiency, enhance customer experience, and scale sustainably.',
  image: '/images/team-3.jpg',
  linkedin: 'https://www.linkedin.com/in/charles-onah023/',
  email: 'charlesonah023@gmail.com',
}
];

// Helper function to get team member by slug
export const getTeamMemberBySlug = (slug: string): TeamMember | undefined => {
  return teamMembers.find(member => member.slug === slug);
};
