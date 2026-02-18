import { useParams, Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { teamMembers, getTeamMemberBySlug } from '@/data/teamMembers';

const TeamMember = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = slug ? getTeamMemberBySlug(slug) : undefined;
  
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();

  if (!member) {
    return (
      <div className="min-h-screen bg-[#1A1A2E]">
        <Navbar />
        <div className="pt-32 pb-20 container-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Team Member Not Found</h1>
            <p className="text-white/70 mb-8">The team member you're looking for doesn't exist.</p>
            <Link 
              to="/#team" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F47B20] text-white rounded-lg hover:bg-[#F47B20]/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Team
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/20 via-transparent to-[#F47B20]/10" />
          
          <div className="container-custom relative z-10">
            <Link 
              to="/#team" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#F47B20] transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Team
            </Link>
            
            <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Image */}
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#7B1F7B]/30 to-[#F47B20]/30">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center text-white text-6xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  )}
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F47B20]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#7B1F7B]/20 rounded-full blur-2xl" />
              </div>
              
              {/* Info */}
              <div className="lg:pl-8">
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
                  <span className="w-8 h-[2px] bg-[#F47B20]" />
                  <span>{member.title.toUpperCase()}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {member.name}
                </h1>
                
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  {member.shortBio}
                </p>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#0077B5]/90 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <Mail className="w-5 h-5" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 border-t border-white/10">
          <div className="container-custom">
            <div className={`max-w-3xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>ABOUT</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                More About {member.name.split(' ')[0]}
              </h2>
              
              <div className="prose prose-invert prose-lg max-w-none">
                {member.fullBio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-white/70 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Team Members */}
        <section className="py-20 border-t border-white/10">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>OUR TEAM</span>
                <span className="w-8 h-[2px] bg-[#F47B20]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Meet Other Team Members
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {teamMembers
                .filter(m => m.slug !== member.slug)
                .slice(0, 3)
                .map((otherMember) => (
                  <Link
                    key={otherMember.id}
                    to={`/team/${otherMember.slug}`}
                    className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#7B1F7B]/20 to-[#F47B20]/20">
                      {otherMember.image ? (
                        <img
                          src={otherMember.image}
                          alt={otherMember.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center text-white text-2xl font-bold">
                            {otherMember.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#F47B20] transition-colors">
                        {otherMember.name}
                      </h3>
                      <p className="text-[#F47B20] text-sm">{otherMember.title}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamMember;
