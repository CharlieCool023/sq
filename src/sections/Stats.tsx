import { useCountUp } from '@/hooks/useScrollAnimation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '+', label: 'Expert Consultants' },
  { value: 10, suffix: '+', label: 'Years Experience' },
];

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { ref, count } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
        {count}
        <span className="text-[#F47B20]">{suffix}</span>
      </div>
      <div className="text-white/60 text-sm md:text-base">{label}</div>
    </div>
  );
};

const Stats = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section 
      ref={ref} 
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7B1F7B] via-[#5A165A] to-[#7B1F7B] animate-gradient-shift" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#F47B20]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
