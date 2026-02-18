import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { useBannerContext } from '@/contexts/BannerContext';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openBooking } = useBannerContext();

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 30;
    const colors = ['#7B1F7B', '#F47B20', '#9B3F9B'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(123, 31, 123, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const stats = [
    { icon: TrendingUp, value: '500+', label: 'Projects Completed' },
    { icon: Users, value: '98%', label: 'Client Satisfaction' },
    { icon: Target, value: '50+', label: 'Expert Consultants' },
    { icon: Zap, value: '10+', label: 'Years Experience' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E]/95 to-[#7B1F7B]/20 z-[1]" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7B1F7B]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F47B20]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B1F7B]/10 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 animate-fade-in">
              <span className="w-2 h-2 bg-[#F47B20] rounded-full animate-pulse" />
              <span className="text-sm text-white/80">Trusted by 500+ Businesses in Nigeria</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Strategic Consulting for{' '}
              <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                Growth-Stage Businesses
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
              We help Nigerian companies scale with data-driven strategies, 
              operational excellence, and digital transformation solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openBooking}
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg py-4"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/services"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-4"
              >
                <Play className="w-5 h-5" />
                Explore Our Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] border-2 border-[#1A1A2E] flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-[#F47B20]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/60">4.9/5 from 200+ reviews</p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden mt-12 grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A2E] to-transparent z-[3]" />
    </section>
  );
};

export default Hero;
