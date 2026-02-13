import { ArrowRight, TrendingUp, Building2, Sprout, Landmark, Home, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBannerContext } from '@/contexts/BannerContext';

const caseStudies = [
  {
    id: 'zenith-retail',
    icon: Building2,
    client: 'Zenith Retail Group',
    industry: 'Retail',
    challenge: 'Declining sales and inefficient inventory management were threatening the business. The company struggled with overstocking some items while running out of popular products.',
    solution: 'We implemented a comprehensive data analytics platform that provided real-time insights into sales patterns, customer preferences, and inventory levels. Additionally, we optimized their supply chain processes.',
    results: [
      '150% revenue increase in 18 months',
      '40% reduction in inventory costs',
      '95% stock availability rate',
      '25% improvement in customer satisfaction',
    ],
    metric: '150%',
    metricLabel: 'Revenue Growth',
    testimonial: 'SQ Consulting transformed our business. Their data-driven approach helped us understand our customers better and make smarter decisions.',
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
  },
  {
    id: 'prologistics',
    icon: TrendingUp,
    client: 'ProLogistics Nigeria',
    industry: 'Logistics',
    challenge: 'High operational costs and frequent delivery delays were eroding profit margins and damaging customer relationships. Legacy systems were holding back efficiency.',
    solution: 'We led a complete digital transformation, implementing modern fleet management systems, route optimization algorithms, and automated warehouse operations.',
    results: [
      '40% reduction in operational costs',
      '60% improvement in on-time deliveries',
      '50% faster order processing',
      '30% increase in customer retention',
    ],
    metric: '40%',
    metricLabel: 'Cost Reduction',
    testimonial: 'The digital transformation exceeded our expectations. We\'re now more efficient and competitive than ever.',
    color: 'from-[#0066CC] to-[#00A3E0]',
  },
  {
    id: 'lagos-agri',
    icon: Sprout,
    client: 'Lagos Agri-Industrial',
    industry: 'Agriculture',
    challenge: 'Limited market reach and distribution challenges were constraining growth. The company wanted to expand beyond Lagos but lacked a clear strategy.',
    solution: 'We developed a comprehensive market expansion strategy, identified key partners in target regions, and established distribution networks in three new markets.',
    results: [
      'Successfully entered 3 new markets',
      '200% increase in market coverage',
      '85% partner satisfaction rate',
      '120% revenue growth from new markets',
    ],
    metric: '3',
    metricLabel: 'New Markets',
    testimonial: 'SQ Consulting\'s market expertise was invaluable. They helped us navigate complex expansion challenges with confidence.',
    color: 'from-[#22C55E] to-[#10B981]',
  },
  {
    id: 'sterling-finserv',
    icon: Landmark,
    client: 'Sterling FinServe',
    industry: 'Financial Services',
    challenge: 'Slow financial reporting and compliance issues were creating risk and inefficiency. Manual processes were error-prone and time-consuming.',
    solution: 'We overhauled their accounting systems, implemented automated reporting tools, and established a comprehensive compliance framework aligned with regulatory requirements.',
    results: [
      '60% faster financial reporting',
      '100% compliance achievement',
      '90% reduction in reporting errors',
      '50% cost savings on compliance',
    ],
    metric: '60%',
    metricLabel: 'Faster Reporting',
    testimonial: 'The transformation in our financial operations has been remarkable. We\'re now a more agile and compliant organization.',
    color: 'from-[#F47B20] to-[#FF9A4D]',
  },
  {
    id: 'modern-spaces',
    icon: Home,
    client: 'Modern Spaces Ltd',
    industry: 'Real Estate',
    challenge: 'Stagnant growth and intense competitive pressure were threatening market position. The brand needed refreshment and a new growth strategy.',
    solution: 'We developed a strategic repositioning plan, created a modern brand identity, and implemented digital marketing strategies to reach new customer segments.',
    results: [
      '200% growth in 18 months',
      '150% increase in qualified leads',
      '80% improvement in brand recognition',
      '45% reduction in customer acquisition cost',
    ],
    metric: '200%',
    metricLabel: 'Growth Rate',
    testimonial: 'SQ Consulting helped us redefine our brand and reach new heights. Their strategic insights were game-changing.',
    color: 'from-[#8B5CF6] to-[#A78BFA]',
  },
];

const SuccessStories = () => {
  const { openBooking } = useBannerContext();

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/20 via-transparent to-[#F47B20]/10" />
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>SUCCESS STORIES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Proven Results for{' '}
                <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                  Our Clients
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                Discover how we've helped businesses across Nigeria and West Africa 
                overcome challenges, seize opportunities, and achieve remarkable growth.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="space-y-20">
              {caseStudies.map((study, index) => (
                <div
                  key={study.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center`}>
                      <study.icon className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <span className="text-[#F47B20] text-sm font-medium">{study.industry}</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{study.client}</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-white font-medium mb-2">The Challenge</h3>
                        <p className="text-white/60">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-2">Our Solution</h3>
                        <p className="text-white/60">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-white font-medium mb-3">Key Results</h3>
                      <ul className="space-y-2">
                        {study.results.map((result) => (
                          <li key={result} className="flex items-start gap-2 text-white/70">
                            <CheckCircle className="w-5 h-5 text-[#F47B20] flex-shrink-0 mt-0.5" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Testimonial */}
                    <div className="glass rounded-xl p-4 border-l-4 border-[#F47B20]">
                      <p className="text-white/80 italic text-sm">"{study.testimonial}"</p>
                    </div>
                  </div>

                  {/* Metric Card */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className={`glass rounded-3xl p-8 md:p-12 bg-gradient-to-br ${study.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative text-center">
                        <div className="text-6xl md:text-7xl font-bold text-white mb-2">{study.metric}</div>
                        <div className="text-white/90 text-xl">{study.metricLabel}</div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                      <div className="absolute top-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/20 to-[#F47B20]/20" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7B1F7B]/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#F47B20]/30 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Let's discuss how we can help your business achieve similar results. 
                  Book a free consultation today.
                </p>
                <button
                  onClick={openBooking}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories;
