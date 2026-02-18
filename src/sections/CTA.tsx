import { ArrowRight, CheckCircle, Calendar, Phone } from 'lucide-react';
import { useBannerContext } from '@/contexts/BannerContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const benefits = [
  'Identify growth opportunities',
  'Clarify your direction',
  'Get expert guidance',
];

const CTA = () => {
  const { openBooking } = useBannerContext();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B] via-[#5A165A] to-[#7B1F7B]" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F47B20]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
            <Calendar className="w-4 h-4 text-[#F47B20]" />
            <span className="text-sm text-white/80">Limited Availability - 5 Spots Only</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform{' '}
            <span className="text-[#F47B20]">Your Business?</span>
          </h2>

          {/* Subheading */}
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a free consultation and discover how we can help you achieve your goals. 
            Our experts are ready to guide you.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full"
              >
                <CheckCircle className="w-4 h-4 text-[#F47B20]" />
                <span className="text-white/80 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openBooking}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F47B20] text-white font-semibold rounded-lg hover:bg-[#FF9A4D] transition-all hover:shadow-lg hover:shadow-[#F47B20]/30 hover:-translate-y-0.5"
            >
              Schedule Your Free Call
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:09037551127"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>

          {/* Trust Text */}
          <p className="text-white/50 text-sm mt-8">
            No commitment required. 10-minute strategy session.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
