import { Link } from 'react-router-dom';
import { BarChart3, Monitor, Calculator, Target, Palette, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useBannerContext } from '@/contexts/BannerContext';

const services = [
  {
    id: 'business-intelligence',
    icon: BarChart3,
    title: 'Business Intelligence & Data Analytics',
    shortDescription: 'Transform fragmented data into strategic business intelligence with advanced analytics and visualization.',
    fullDescription: 'We help businesses unlock the power of their data through predictive modeling, interactive dashboards, and real-time KPI monitoring. Our solutions are tailored for retail, logistics, and fintech companies seeking data-driven decision making.',
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
    features: [
      'Predictive modeling & forecasting',
      'Interactive dashboard creation',
      'Real-time KPI monitoring',
      'Data visualization & reporting',
      'Custom analytics solutions',
      'Performance optimization',
    ],
    useCases: [
      'Retail sales forecasting',
      'Customer behavior analysis',
      'Supply chain optimization',
      'Financial performance tracking',
    ],
  },
  {
    id: 'digital-transformation',
    icon: Monitor,
    title: 'Digital Transformation & Software Transition',
    shortDescription: 'Modernize your technology infrastructure with seamless legacy system migrations.',
    fullDescription: 'We manage complex legacy system migrations to modern cloud platforms, ensuring minimal disruption to your operations. Our comprehensive approach includes ERP/CRM implementation, data migration, and thorough staff training programs.',
    color: 'from-[#0066CC] to-[#00A3E0]',
    features: [
      'Legacy system migration',
      'Cloud platform implementation',
      'ERP/CRM integration',
      'Staff training & support',
      'Process automation',
      'Change management',
    ],
    useCases: [
      'ERP system implementation',
      'Cloud migration projects',
      'Workflow automation',
      'Digital workplace setup',
    ],
  },
  {
    id: 'accounting-finance',
    icon: Calculator,
    title: 'Accounting Operations & Financial Strategy',
    shortDescription: 'Optimize financial processes and ensure compliance with expert accounting services.',
    fullDescription: 'We provide full IFRS and GAAP compliance, monthly financial reporting, strategic tax planning, and fractional CFO services. Our financial modeling expertise helps businesses secure funding and make informed decisions.',
    color: 'from-[#22C55E] to-[#10B981]',
    features: [
      'IFRS & GAAP compliance',
      'Monthly financial reporting',
      'Strategic tax planning',
      'Fractional CFO services',
      'Financial modeling',
      'Audit preparation',
    ],
    useCases: [
      'Financial statement preparation',
      'Tax optimization strategies',
      'Investor reporting',
      'Budget planning & forecasting',
    ],
  },
  {
    id: 'business-strategy',
    icon: Target,
    title: 'Business Strategy & Operational Excellence',
    shortDescription: 'Build comprehensive strategies for sustainable growth and operational efficiency.',
    fullDescription: 'We develop comprehensive business plans, investor-ready pitch decks, operational SOPs, and conduct in-depth market research. Our growth strategies help scaling companies navigate expansion challenges successfully.',
    color: 'from-[#F47B20] to-[#FF9A4D]',
    features: [
      'Business plan development',
      'SOP documentation',
      'Market research & analysis',
      'Investor pitch decks',
      'Growth strategy planning',
      'Operational optimization',
    ],
    useCases: [
      'Startup business planning',
      'Market entry strategies',
      'Process optimization',
      'Investor presentations',
    ],
  },
  {
    id: 'brand-design',
    icon: Palette,
    title: 'Corporate Brand Design',
    shortDescription: 'Create compelling brand identities that resonate with your target audience.',
    fullDescription: 'We offer comprehensive brand design services including logo design, brand guidelines, marketing collateral, and visual identity systems. Our designs help businesses stand out and communicate their value effectively.',
    color: 'from-[#8B5CF6] to-[#A78BFA]',
    features: [
      'Logo design & brand identity',
      'Brand guidelines development',
      'Marketing collateral design',
      'Corporate stationery',
      'Brand strategy consulting',
      'Visual identity systems',
    ],
    useCases: [
      'New brand launches',
      'Brand refresh projects',
      'Marketing campaign design',
      'Corporate rebranding',
    ],
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Training & Development',
    shortDescription: 'Empower your team with practical skills and professional development programs.',
    fullDescription: 'We provide customized training programs in data analysis, accounting processes, customer service, and business management. Our practical, hands-on approach ensures your team can apply what they learn immediately.',
    color: 'from-[#EC4899] to-[#F472B6]',
    features: [
      'Data analysis training (Excel)',
      'Accounting process training',
      'Customer service excellence',
      'Leadership development',
      'Custom training programs',
      'Workshop facilitation',
    ],
    useCases: [
      'Team skill development',
      'New hire onboarding',
      'Process training',
      'Leadership coaching',
    ],
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
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
                <span>OUR SERVICES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Comprehensive Solutions for{' '}
                <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                  Every Challenge
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                From data analytics to digital transformation, we offer end-to-end consulting 
                services tailored to help your business thrive in today's competitive landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={ref} className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`group glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${service.color}`}>
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-white/70 mb-4">{service.shortDescription}</p>

                    {/* Features Preview */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-[#F47B20]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-[#F47B20] font-medium text-sm hover:gap-3 transition-all"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={openBooking}
                        className="text-white/60 hover:text-white text-sm transition-colors"
                      >
                        Book Now
                      </button>
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
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/20 to-[#F47B20]/20" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7B1F7B]/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#F47B20]/30 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Not Sure Which Service You Need?
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Schedule a free consultation and we'll help you identify the best solutions 
                  for your business challenges.
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

export default Services;
