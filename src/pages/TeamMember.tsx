import { useParams, Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowLeft, Award, GraduationCap, Briefcase, Quote } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { teamMembers, getTeamMemberBySlug } from '@/data/teamMembers';

const TeamMember = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = slug ? getTeamMemberBySlug(slug) : undefined;
  
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: bioRef, isVisible: bioVisible } = useScrollAnimation();
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation();

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
        <section ref={heroRef} className="pt-32 pb-16 relative overflow-hidden">
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
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-[#7B1F7B]/30 to-[#F47B20]/30">
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
              <div>
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
                  <span className="w-8 h-[2px] bg-[#F47B20]" />
                  <span>{member.title.toUpperCase()}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
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
                    LinkedIn Profile
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

        {/* Quote Section */}
        {member.quote && (
          <section className="py-12 border-y border-white/10">
            <div className="container-custom">
              <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Quote className="w-12 h-12 text-[#F47B20] mx-auto mb-6" />
                <blockquote className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed">
                  "{member.quote}"
                </blockquote>
              </div>
            </div>
          </section>
        )}

        {/* Full Biography */}
        <section ref={bioRef} className="py-20">
          <div className="container-custom">
            <div className={`max-w-4xl transition-all duration-700 ${bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>ABOUT</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Biography
              </h2>
              
              <div className="prose prose-invert prose-lg max-w-none">
                {member.fullBio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-white/70 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Achievements */}
        <section ref={detailsRef} className="py-20 bg-white/5">
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Expertise */}
              <div>
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                  <span className="w-8 h-[2px] bg-[#F47B20]" />
                  <span>EXPERTISE</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">
                  Areas of Expertise
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {member.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-[#7B1F7B]/20 to-[#F47B20]/20 border border-white/10 rounded-full text-white/90 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              <div>
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                  <Award className="w-4 h-4" />
                  <span>ACHIEVEMENTS</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">
                  Key Achievements
                </h3>
                
                <ul className="space-y-4">
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#F47B20] mt-2 flex-shrink-0" />
                      <span className="text-white/70">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Experience */}
              <div>
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                  <Briefcase className="w-4 h-4" />
                  <span>EXPERIENCE</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">
                  Professional Journey
                </h3>
                
                <div className="space-y-6">
                  {member.experience.map((exp, index) => (
                    <div 
                      key={index}
                      className="relative pl-8 border-l-2 border-[#7B1F7B]/30"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#7B1F7B] border-2 border-[#1A1A2E]" />
                      <p className="text-white/70">{exp}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education */}
              <div>
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                  <GraduationCap className="w-4 h-4" />
                  <span>EDUCATION</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">
                  Academic Background
                </h3>
                
                <div className="space-y-6">
                  {member.education.map((edu, index) => (
                    <div 
                      key={index}
                      className="relative pl-8 border-l-2 border-[#F47B20]/30"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#F47B20] border-2 border-[#1A1A2E]" />
                      <p className="text-white/70">{edu}</p>
                    </div>
                  ))}
                </div>
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
            
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers
                .filter(m => m.slug !== member.slug)
                .slice(0, 3)
                .map((otherMember) => (
                  <Link
                    key={otherMember.id}
                    to={`/team/${otherMember.slug}`}
                    className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-[#7B1F7B]/20 to-[#F47B20]/20">
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
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#F47B20] transition-colors">
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
