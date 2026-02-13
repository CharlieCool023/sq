import { Link } from 'react-router-dom';
import { ArrowRight, Award, Lightbulb, Users, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  { icon: Award, title: 'Excellence', description: 'We deliver nothing but the best' },
  { icon: Lightbulb, title: 'Innovation', description: 'Creative solutions for complex challenges' },
  { icon: Users, title: 'Partnership', description: 'Your success is our success' },
  { icon: Target, title: 'Impact', description: 'Measurable results that matter' },
];

const WhoWeAre = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7B1F7B]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F47B20]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src="/images/about-office.jpg"
                  alt="SQ Consulting Office"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Delivering Value</h3>
                      <p className="text-white/80 text-sm">Since 2018</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-[#2D2D3A] rounded-xl p-4 shadow-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-sm text-white/60">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#7B1F7B]/30 rounded-xl" />
            <div className="absolute -bottom-4 left-1/4 w-16 h-16 bg-[#F47B20]/20 rounded-full blur-xl" />
          </div>

          {/* Right - Content */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium">
              <span className="w-8 h-[2px] bg-[#F47B20]" />
              <span>WHO WE ARE</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Your Partner in{' '}
              <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                Business Transformation
              </span>
            </h2>

            {/* Description */}
            <p className="text-white/70 text-lg leading-relaxed">
              SQ Consulting is a full-service growth and strategy advisory firm based in Lagos, Nigeria. 
              We specialize in business transformation, digital automation, and corporate brand positioning. 
              We help organizations streamline operations, unlock growth, and achieve long-term success.
            </p>

            {/* Mission */}
            <div className="glass rounded-xl p-6 border-l-4 border-[#F47B20]">
              <p className="text-white/90 italic">
                "To empower Nigerian businesses with world-class consulting that drives measurable results."
              </p>
              <p className="text-[#F47B20] text-sm mt-2">— Our Mission</p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`flex items-start gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#7B1F7B]/20 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-[#F47B20]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{value.title}</h4>
                    <p className="text-white/60 text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[#F47B20] font-medium hover:gap-4 transition-all"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
