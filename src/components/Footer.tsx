import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  { label: 'Business Intelligence', href: '/services' },
  { label: 'Digital Transformation', href: '/services' },
  { label: 'Accounting & Finance', href: '/services' },
  { label: 'Business Strategy', href: '/services' },
  { label: 'Brand Design', href: '/services' },
  { label: 'Training', href: '/services' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="bg-[#1A1A2E] border-t border-white/10">
      {/* Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-[#7B1F7B] via-[#F47B20] to-[#7B1F7B]" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/SQ_TINY.png" alt="SQ Consulting" className="w-12 h-12" />
              <div>
                <span className="text-xl font-bold text-white">SQ Consulting</span>
                <span className="block text-xs text-[#F47B20]">Delivering Value...</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Your trusted partner for business transformation, digital solutions, 
              and strategic growth in Nigeria and West Africa.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#7B1F7B] hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-[#F47B20] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B1F7B] group-hover:bg-[#F47B20] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-white/60 hover:text-[#F47B20] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B1F7B] group-hover:bg-[#F47B20] transition-colors" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:sqconsultinginc@gmail.com"
                  className="text-white/60 hover:text-[#F47B20] transition-colors duration-300 text-sm flex items-start gap-3"
                >
                  <Mail className="w-5 h-5 text-[#7B1F7B] flex-shrink-0 mt-0.5" />
                  <span>sqconsultinginc@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sqconsultinginc.com.ng"
                  className="text-white/60 hover:text-[#F47B20] transition-colors duration-300 text-sm flex items-start gap-3"
                >
                  <Mail className="w-5 h-5 text-[#7B1F7B] flex-shrink-0 mt-0.5" />
                  <span>info@sqconsultinginc.com.ng</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:09037551127"
                  className="text-white/60 hover:text-[#F47B20] transition-colors duration-300 text-sm flex items-start gap-3"
                >
                  <Phone className="w-5 h-5 text-[#7B1F7B] flex-shrink-0 mt-0.5" />
                  <span>09037551127</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:08147207282"
                  className="text-white/60 hover:text-[#F47B20] transition-colors duration-300 text-sm flex items-start gap-3"
                >
                  <Phone className="w-5 h-5 text-[#7B1F7B] flex-shrink-0 mt-0.5" />
                  <span>08147207282</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7B1F7B] flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Lagos Island, Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} SQ Consulting. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
