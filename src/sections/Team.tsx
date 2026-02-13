import { Linkedin, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const teamMembers = [
  {
    name: 'Oluwaseun Adeyemi',
    title: 'Managing Partner',
    bio: 'Strategic leader with 15+ years in business consulting and transformation.',
    image: '/images/team-1.jpg',
    linkedin: '#',
    email: 'seun@sqconsulting.com',
  },
  {
    name: 'Chioma Nwosu',
    title: 'Strategy Director',
    bio: 'Expert in market expansion and growth strategy for African businesses.',
    image: '/images/team-2.jpg',
    linkedin: '#',
    email: 'chioma@sqconsulting.com',
  },
  {
    name: 'Ibrahim Mohammed',
    title: 'Technology Lead',
    bio: 'Digital transformation specialist with expertise in ERP and cloud solutions.',
    image: '/images/team-3.jpg',
    linkedin: '#',
    email: 'ibrahim@sqconsulting.com',
  },
  {
    name: 'Ngozi Eze',
    title: 'Operations Manager',
    bio: 'Process optimization expert focused on operational excellence.',
    image: '/images/team-4.jpg',
    linkedin: '#',
    email: 'ngozi@sqconsulting.com',
  },
];

const Team = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F47B20]/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
            <span className="w-8 h-[2px] bg-[#F47B20]" />
            <span>OUR TEAM</span>
            <span className="w-8 h-[2px] bg-[#F47B20]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet the{' '}
            <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
              Experts
            </span>{' '}
            Behind Your Success
          </h2>
          <p className="text-white/70 text-lg">
            Our diverse team brings decades of combined experience across industries 
            to deliver exceptional results for your business.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-[#7B1F7B]/20 to-[#F47B20]/20">
                {/* Team Member Image */}
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center text-white text-3xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#7B1F7B] transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#F47B20] transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#F47B20] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#F47B20] text-sm mb-3">{member.title}</p>
                <p className="text-white/60 text-sm line-clamp-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
