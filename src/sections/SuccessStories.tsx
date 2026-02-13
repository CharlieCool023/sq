import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Building2, Sprout, Landmark, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const caseStudies = [
  {
    id: 'zenith-retail',
    icon: Building2,
    client: 'Zenith Retail Group',
    industry: 'Retail',
    challenge: 'Declining sales and inefficient inventory management',
    solution: 'Implemented data analytics platform and optimized supply chain',
    result: '150% revenue increase in 18 months',
    metric: '150%',
    metricLabel: 'Revenue Growth',
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
  },
  {
    id: 'prologistics',
    icon: TrendingUp,
    client: 'ProLogistics Nigeria',
    industry: 'Logistics',
    challenge: 'High operational costs and delivery delays',
    solution: 'Digital transformation and process automation',
    result: '40% reduction in operational costs',
    metric: '40%',
    metricLabel: 'Cost Reduction',
    color: 'from-[#0066CC] to-[#00A3E0]',
  },
  {
    id: 'lagos-agri',
    icon: Sprout,
    client: 'Lagos Agri-Industrial',
    industry: 'Agriculture',
    challenge: 'Limited market reach and distribution challenges',
    solution: 'Market expansion strategy and partnership development',
    result: 'Successfully entered 3 new markets',
    metric: '3',
    metricLabel: 'New Markets',
    color: 'from-[#22C55E] to-[#10B981]',
  },
  {
    id: 'sterling-finserv',
    icon: Landmark,
    client: 'Sterling FinServe',
    industry: 'Financial Services',
    challenge: 'Slow financial reporting and compliance issues',
    solution: 'Accounting system overhaul and compliance framework',
    result: '60% faster reporting with full compliance',
    metric: '60%',
    metricLabel: 'Faster Reporting',
    color: 'from-[#F47B20] to-[#FF9A4D]',
  },
  {
    id: 'modern-spaces',
    icon: Home,
    client: 'Modern Spaces Ltd',
    industry: 'Real Estate',
    challenge: 'Stagnant growth and competitive pressure',
    solution: 'Strategic repositioning and digital marketing',
    result: '200% growth in 18 months',
    metric: '200%',
    metricLabel: 'Growth Rate',
    color: 'from-[#8B5CF6] to-[#A78BFA]',
  },
];

const SuccessStories = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/10 via-transparent to-[#F47B20]/10" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
              <span className="w-8 h-[2px] bg-[#F47B20]" />
              <span>SUCCESS STORIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Proven Results for{' '}
              <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                Our Clients
              </span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#7B1F7B] hover:border-[#7B1F7B] transition-all"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#7B1F7B] hover:border-[#7B1F7B] transition-all"
              aria-label="Next case study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Case Studies Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className="w-full flex-shrink-0 px-2"
              >
                <div className={`glass rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="grid lg:grid-cols-2">
                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center mb-6`}>
                        <study.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="text-sm text-[#F47B20] font-medium mb-2">{study.industry}</div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{study.client}</h3>

                      <div className="space-y-4 mb-8">
                        <div>
                          <span className="text-white/40 text-sm">Challenge:</span>
                          <p className="text-white/70">{study.challenge}</p>
                        </div>
                        <div>
                          <span className="text-white/40 text-sm">Solution:</span>
                          <p className="text-white/70">{study.solution}</p>
                        </div>
                      </div>

                      <Link
                        to="/success-stories"
                        className="inline-flex items-center gap-2 text-[#F47B20] font-medium hover:gap-3 transition-all"
                      >
                        Read Full Case Study
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>

                    {/* Result Card */}
                    <div className={`relative bg-gradient-to-br ${study.color} p-8 lg:p-12 flex flex-col justify-center`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative">
                        <div className="text-white/80 text-sm mb-2">Result</div>
                        <div className="text-5xl lg:text-6xl font-bold text-white mb-4">{study.metric}</div>
                        <div className="text-white/90 text-xl">{study.metricLabel}</div>
                        <p className="text-white/70 mt-4">{study.result}</p>
                      </div>

                      {/* Decorative */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                      <div className="absolute top-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-[#F47B20] w-8'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to case study ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
