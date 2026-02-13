import { Link } from 'react-router-dom';
import { Award, Lightbulb, Users, Target, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const coreValues = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We deliver nothing but the best. Every project receives our full attention and expertise.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We operate with transparency and honesty in all our client relationships.',
  },
  {
    icon: Target,
    title: 'Impact',
    description: 'We focus on delivering measurable results that drive real business growth.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace creative solutions and cutting-edge approaches to solve challenges.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We work alongside our clients as true partners, invested in their success.',
  },
];

const differentiators = [
  'Deep understanding of the Nigerian and West African market',
  'Proven track record with 500+ successful projects',
  'End-to-end service from strategy to implementation',
  'Senior-level expertise on every engagement',
  'Data-driven approach with measurable outcomes',
  'Local presence with global best practices',
];

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: diffRef, isVisible: diffVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/20 via-transparent to-[#F47B20]/10" />
          
          <div className="container-custom relative z-10">
            <div className={`max-w-4xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>ABOUT US</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Your Trusted Partner in{' '}
                <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                  Business Excellence
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                SQ Consulting is a full-service growth and strategy advisory firm, specializing 
                in business transformation, digital automation, and corporate brand positioning. 
                Since 2018, we've been helping Nigerian businesses achieve sustainable growth.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Our{' '}
                  <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                    Story
                  </span>
                </h2>
                
                <p className="text-white/70 leading-relaxed">
                  Founded in 2018 in Lagos, Nigeria, SQ Consulting began with a simple mission: 
                  to provide world-class consulting services tailored to the unique challenges 
                  of Nigerian and West African businesses.
                </p>
                
                <p className="text-white/70 leading-relaxed">
                  What started as a small team of passionate consultants has grown into a 
                  full-service advisory firm with expertise across business intelligence, 
                  digital transformation, financial strategy, and operational excellence.
                </p>
                
                <p className="text-white/70 leading-relaxed">
                  Today, we're proud to have served over 500 businesses, helping them navigate 
                  complex challenges, seize growth opportunities, and achieve remarkable results.
                </p>

                {/* Mission & Vision */}
                <div className="grid sm:grid-cols-2 gap-6 pt-6">
                  <div className="glass rounded-xl p-6 border-l-4 border-[#7B1F7B]">
                    <h3 className="text-lg font-semibold text-white mb-2">Our Mission</h3>
                    <p className="text-white/60 text-sm">
                      To empower Nigerian businesses with world-class consulting that drives measurable results.
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 border-l-4 border-[#F47B20]">
                    <h3 className="text-lg font-semibold text-white mb-2">Our Vision</h3>
                    <p className="text-white/60 text-sm">
                      To be the most trusted consulting partner for growth-stage West African companies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right - Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#F47B20] mb-2">500+</div>
                  <div className="text-white/60">Projects Completed</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#7B1F7B] mb-2">98%</div>
                  <div className="text-white/60">Client Satisfaction</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#F47B20] mb-2">50+</div>
                  <div className="text-white/60">Expert Consultants</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#7B1F7B] mb-2">7+</div>
                  <div className="text-white/60">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section ref={valuesRef} className="section-padding bg-gradient-to-b from-transparent via-[#7B1F7B]/5 to-transparent">
          <div className="container-custom">
            <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>OUR VALUES</span>
                <span className="w-8 h-[2px] bg-[#F47B20]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What We{' '}
                <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                  Stand For
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  className={`glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section ref={diffRef} className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div className={`transition-all duration-700 ${diffVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
                  <span className="w-8 h-[2px] bg-[#F47B20]" />
                  <span>WHY CHOOSE US</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  The{' '}
                  <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                    SQ Difference
                  </span>
                </h2>
                <p className="text-white/70 mb-8">
                  We combine local market expertise with global best practices to deliver 
                  exceptional results for our clients.
                </p>

                <Link
                  to="/services"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Explore Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Right - Differentiators */}
              <div className={`space-y-4 transition-all duration-700 delay-200 ${diffVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                {differentiators.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 glass rounded-xl p-4"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#7B1F7B]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#F47B20]" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
