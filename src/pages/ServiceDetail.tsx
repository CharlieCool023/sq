import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBannerContext } from '@/contexts/BannerContext';

const services = [
  {
    id: 'business-intelligence',
    title: 'Business Intelligence & Data Analytics',
    description: 'Transform fragmented data into strategic business intelligence with advanced analytics and visualization.',
    fullDescription: `In today's data-driven world, businesses that leverage their data effectively gain a significant competitive advantage. Our Business Intelligence & Data Analytics services help you unlock the full potential of your data.

We work with retail, logistics, and fintech companies to implement comprehensive data solutions that drive informed decision-making and measurable business outcomes.`,
    features: [
      'Predictive modeling & forecasting',
      'Interactive dashboard creation',
      'Real-time KPI monitoring',
      'Data visualization & reporting',
      'Custom analytics solutions',
      'Performance optimization',
      'Data quality management',
      'Business intelligence training',
    ],
    useCases: [
      {
        title: 'Retail Sales Forecasting',
        description: 'Helped a retail chain improve inventory management by 40% through predictive analytics.',
      },
      {
        title: 'Customer Behavior Analysis',
        description: 'Enabled a fintech company to increase customer retention by 25% through data insights.',
      },
      {
        title: 'Supply Chain Optimization',
        description: 'Reduced logistics costs by 30% for a distribution company through route optimization.',
      },
    ],
    benefits: [
      'Make data-driven decisions with confidence',
      'Identify trends and opportunities early',
      'Optimize operations and reduce costs',
      'Improve customer understanding and targeting',
      'Measure and track performance effectively',
    ],
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation & Software Transition',
    description: 'Modernize your technology infrastructure with seamless legacy system migrations.',
    fullDescription: `Digital transformation is no longer optional—it's essential for business survival and growth. Our Digital Transformation services help you navigate the complex journey from legacy systems to modern, cloud-based solutions.

We ensure minimal disruption to your operations while maximizing the benefits of new technologies.`,
    features: [
      'Legacy system migration',
      'Cloud platform implementation',
      'ERP/CRM integration',
      'Staff training & support',
      'Process automation',
      'Change management',
      'Data migration services',
      'System integration',
    ],
    useCases: [
      {
        title: 'ERP Implementation',
        description: 'Successfully implemented SAP for a manufacturing company with 500+ employees.',
      },
      {
        title: 'Cloud Migration',
        description: 'Migrated a financial services company to AWS with zero downtime.',
      },
      {
        title: 'Workflow Automation',
        description: 'Automated 80% of manual processes for a logistics company.',
      },
    ],
    benefits: [
      'Increase operational efficiency',
      'Reduce IT maintenance costs',
      'Improve data security and compliance',
      'Enable remote work capabilities',
      'Scale your business more easily',
    ],
    color: 'from-[#0066CC] to-[#00A3E0]',
  },
  {
    id: 'accounting-finance',
    title: 'Accounting Operations & Financial Strategy',
    description: 'Optimize financial processes and ensure compliance with expert accounting services.',
    fullDescription: `Sound financial management is the foundation of business success. Our Accounting & Financial Strategy services provide you with the expertise and systems needed to maintain financial health and compliance.

From day-to-day bookkeeping to strategic financial planning, we support businesses at every stage of growth.`,
    features: [
      'IFRS & GAAP compliance',
      'Monthly financial reporting',
      'Strategic tax planning',
      'Fractional CFO services',
      'Financial modeling',
      'Audit preparation',
      'Budget planning',
      'Cash flow management',
    ],
    useCases: [
      {
        title: 'Financial Restructuring',
        description: 'Helped a retail company reduce tax liability by 35% through strategic planning.',
      },
      {
        title: 'Investor Reporting',
        description: 'Prepared investor-ready financials that helped secure $2M in funding.',
      },
      {
        title: 'Compliance Framework',
        description: 'Implemented full IFRS compliance for a growing SME.',
      },
    ],
    benefits: [
      'Ensure regulatory compliance',
      'Make better financial decisions',
      'Optimize tax position legally',
      'Improve cash flow management',
      'Prepare for investment or sale',
    ],
    color: 'from-[#22C55E] to-[#10B981]',
  },
  {
    id: 'business-strategy',
    title: 'Business Strategy & Operational Excellence',
    description: 'Build comprehensive strategies for sustainable growth and operational efficiency.',
    fullDescription: `Success doesn't happen by accident—it requires careful planning and execution. Our Business Strategy services help you develop clear roadmaps for growth and operational excellence.

We work with you to understand your vision, analyze your market, and create actionable strategies that deliver results.`,
    features: [
      'Business plan development',
      'SOP documentation',
      'Market research & analysis',
      'Investor pitch decks',
      'Growth strategy planning',
      'Operational optimization',
      'Competitive analysis',
      'Strategic planning workshops',
    ],
    useCases: [
      {
        title: 'Market Entry Strategy',
        description: 'Helped a fintech company successfully launch in 3 new African markets.',
      },
      {
        title: 'Investor Pitch',
        description: 'Created pitch deck that helped a startup raise $5M in Series A funding.',
      },
      {
        title: 'Process Optimization',
        description: 'Reduced operational costs by 25% through SOP implementation.',
      },
    ],
    benefits: [
      'Clarify your business direction',
      'Identify growth opportunities',
      'Improve operational efficiency',
      'Attract investment',
      'Build sustainable competitive advantage',
    ],
    color: 'from-[#F47B20] to-[#FF9A4D]',
  },
  {
    id: 'brand-design',
    title: 'Corporate Brand Design',
    description: 'Create compelling brand identities that resonate with your target audience.',
    fullDescription: `Your brand is more than a logo—it's the entire experience customers have with your business. Our Brand Design services help you create a cohesive, memorable brand that connects with your audience.

From visual identity to brand strategy, we help you stand out in a crowded marketplace.`,
    features: [
      'Logo design & brand identity',
      'Brand guidelines development',
      'Marketing collateral design',
      'Corporate stationery',
      'Brand strategy consulting',
      'Visual identity systems',
      'Brand refresh projects',
      'Packaging design',
    ],
    useCases: [
      {
        title: 'Brand Launch',
        description: 'Created complete brand identity for a new fintech startup.',
      },
      {
        title: 'Brand Refresh',
        description: 'Modernized brand for a 20-year-old company while preserving heritage.',
      },
      {
        title: 'Marketing Campaign',
        description: 'Designed award-winning campaign that increased brand awareness by 60%.',
      },
    ],
    benefits: [
      'Build brand recognition',
      'Connect with target audience',
      'Differentiate from competitors',
      'Increase perceived value',
      'Create consistent brand experience',
    ],
    color: 'from-[#8B5CF6] to-[#A78BFA]',
  },
  {
    id: 'training',
    title: 'Training & Development',
    description: 'Empower your team with practical skills and professional development programs.',
    fullDescription: `Your people are your greatest asset. Our Training & Development services help you build a skilled, motivated team that can drive your business forward.

We offer practical, hands-on training that your team can apply immediately to improve performance.`,
    features: [
      'Data analysis training (Excel)',
      'Accounting process training',
      'Customer service excellence',
      'Leadership development',
      'Custom training programs',
      'Workshop facilitation',
      'Team building programs',
      'Professional certification prep',
    ],
    useCases: [
      {
        title: 'Excel Training',
        description: 'Trained 50+ employees in advanced Excel, improving productivity by 30%.',
      },
      {
        title: 'Leadership Program',
        description: 'Developed leadership pipeline for a growing company.',
      },
      {
        title: 'Customer Service',
        description: 'Improved customer satisfaction scores by 40% through service training.',
      },
    ],
    benefits: [
      'Build team capabilities',
      'Improve productivity',
      'Increase employee satisfaction',
      'Reduce errors and rework',
      'Prepare team for growth',
    ],
    color: 'from-[#EC4899] to-[#F472B6]',
  },
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { openBooking } = useBannerContext();
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className={`pt-32 pb-20 relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`} />
          
          <div className="container-custom relative z-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#F47B20] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
                  <div className="text-white/70 leading-relaxed whitespace-pre-line">
                    {service.fullDescription}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 glass rounded-xl p-4"
                      >
                        <CheckCircle className="w-5 h-5 text-[#F47B20] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Success Stories</h2>
                  <div className="space-y-4">
                    {service.useCases.map((useCase) => (
                      <div
                        key={useCase.title}
                        className="glass rounded-xl p-6 border-l-4 border-[#F47B20]"
                      >
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-white/60">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <div className={`glass rounded-2xl p-6 bg-gradient-to-br ${service.color}`}>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-white/80 mb-6">
                    Book a free consultation to discuss how we can help your business.
                  </p>
                  <button
                    onClick={openBooking}
                    className="w-full py-3 bg-white text-[#1A1A2E] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Benefits */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F47B20] mt-1.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Have Questions?</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Our team is ready to answer any questions you may have.
                  </p>
                  <a
                    href="tel:09037551127"
                    className="text-[#F47B20] hover:underline"
                  >
                    Call us: 09037551127
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
