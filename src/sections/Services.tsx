import { Link } from 'react-router-dom';
import { BarChart3, Monitor, Calculator, Target, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useBannerContext } from '@/contexts/BannerContext';

const services = [
  {
    id: 'business-intelligence',
    icon: BarChart3,
    title: 'Business Intelligence & Data Analytics',
    shortDescription: 'Transform fragmented data into strategic business intelligence',
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
    features: [
      'Predictive modeling & forecasting',
      'Interactive dashboard creation',
      'Real-time KPI monitoring',
      'Data visualization & reporting',
    ],
  },
  {
    id: 'digital-transformation',
    icon: Monitor,
    title: 'Digital Transformation & Software Transition',
    shortDescription: 'Modernize your technology infrastructure seamlessly',
    color: 'from-[#0066CC] to-[#00A3E0]',
    features: [
      'Legacy system migration',
      'Cloud platform implementation',
      'ERP/CRM integration',
      'Staff training & support',
    ],
  },
  {
    id: 'accounting-finance',
    icon: Calculator,
    title: 'Accounting Operations & Financial Strategy',
    shortDescription: 'Optimize financial processes and ensure compliance',
    color: 'from-[#22C55E] to-[#10B981]',
    features: [
      'IFRS & GAAP compliance',
      'Monthly financial reporting',
      'Strategic tax planning',
      'Fractional CFO services',
    ],
  },
  {
    id: 'business-strategy',
    icon: Target,
    title: 'Business Strategy & Operational Excellence',
    shortDescription: 'Build strategies for sustainable growth',
    color: 'from-[#F47B20] to-[#FF9A4D]',
    features: [
      'Business plan development',
      'SOP documentation',
      'Market research & analysis',
      'Investor pitch decks',
    ],
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { openBooking } = useBannerContext();

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B1F7B]/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
            <Sparkles className="w-5 h-5" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comprehensive Solutions for{' '}
            <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
              Your Business
            </span>
          </h2>
          <p className="text-white/70 text-lg">
            We offer end-to-end consulting services tailored to your unique challenges 
            and growth objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
              <div className="absolute inset-[1px] rounded-2xl bg-[#2D2D3A] -z-[5]" />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F47B20] transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60 mb-6">{service.shortDescription}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F47B20]" />
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
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={openBooking}
            className="btn-primary inline-flex items-center gap-2"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
