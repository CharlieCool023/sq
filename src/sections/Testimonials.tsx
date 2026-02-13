import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    id: 1,
    name: 'Adeola Williams',
    title: 'CEO',
    company: 'Zenith Retail Group',
    content: 'SQ Consulting transformed our operations completely. Their strategic insights helped us achieve 150% revenue growth in just 18 months. The team\'s dedication and expertise are unmatched.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Okonjo',
    title: 'CTO',
    company: 'ProLogistics Nigeria',
    content: 'The team\'s expertise in digital transformation saved us months of trial and error. Their approach to legacy system migration was seamless and professional. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatima Bello',
    title: 'CFO',
    company: 'Sterling FinServe',
    content: 'Professional, knowledgeable, and results-driven. SQ Consulting is our trusted partner for all strategic decisions. Their financial advisory services have been invaluable to our growth.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emmanuel Okafor',
    title: 'Managing Director',
    company: 'Lagos Agri-Industrial',
    content: 'Thanks to SQ Consulting, we successfully expanded into three new markets. Their market research and strategic planning were instrumental in our expansion success.',
    rating: 5,
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/10 via-transparent to-[#F47B20]/10" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
            <span className="w-8 h-[2px] bg-[#F47B20]" />
            <span>TESTIMONIALS</span>
            <span className="w-8 h-[2px] bg-[#F47B20]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center z-10">
            <Quote className="w-8 h-8 text-white" />
          </div>

          {/* Cards Container */}
          <div className="glass rounded-3xl p-8 md:p-12 pt-16 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B1F7B]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F47B20]/10 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#F47B20] fill-[#F47B20]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-white text-center leading-relaxed mb-8">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-[#F47B20]">{testimonial.title}</p>
                    <p className="text-white/60 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#7B1F7B] hover:border-[#7B1F7B] transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? 'bg-[#F47B20] w-6'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#7B1F7B] hover:border-[#7B1F7B] transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
