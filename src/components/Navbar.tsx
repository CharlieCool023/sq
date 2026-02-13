import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useBannerContext } from '@/contexts/BannerContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBooking } = useBannerContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'
      }`}>
        <div className="bg-[#7B1F7B] text-white py-2">
          <div className="container-custom flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:09037551127" className="flex items-center gap-1 hover:text-[#F47B20] transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">09037551127</span>
              </a>
              <a href="mailto:sqconsultinginc@gmail.com" className="flex items-center gap-1 hover:text-[#F47B20] transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">sqconsultinginc@gmail.com</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-white/80">Delivering Value...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'top-0 bg-[#1A1A2E]/95 backdrop-blur-xl shadow-lg shadow-black/20' 
          : 'top-10 bg-transparent'
      }`}>
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/SQ_TINY.png" alt="SQ Consulting" className="w-10 h-10 md:w-12 md:h-12" />
              <div className="hidden sm:block">
                <span className="text-lg md:text-xl font-bold text-white">SQ Consulting</span>
                <span className="block text-xs text-[#F47B20]">Delivering Value...</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive(link.href)
                      ? 'text-[#F47B20]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={openBooking}
                className="btn-primary text-sm"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#F47B20] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed left-0 right-0 bg-[#1A1A2E] border-t border-white/10 transition-all duration-500 overflow-y-auto ${
          isScrolled ? 'top-16' : 'top-[88px]'
        } ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}>
          <div className="container-custom py-8">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-[#F47B20] bg-[#7B1F7B]/20 border-l-2 border-[#F47B20]'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideUp 0.4s ease forwards' : 'none'
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBooking();
                }}
                className="btn-primary mt-6 text-center py-4"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-20' : 'h-28'}`} />
    </>
  );
};

export default Navbar;
