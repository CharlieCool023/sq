import { useState } from 'react';
import { X, Calendar, User, Mail, Phone, Building, MessageSquare, CheckCircle } from 'lucide-react';
import { useBannerContext } from '@/contexts/BannerContext';
import { supabase } from '@/lib/database';
import { toast } from 'sonner';

const services = [
  'Business Intelligence & Data Analytics',
  'Digital Transformation & Software Transition',
  'Accounting Operations & Financial Strategy',
  'Business Strategy & Operational Excellence',
  'Corporate Brand Design',
  'Training & Development',
  'Other',
];

const BookingModal = () => {
  const { isBookingOpen, closeBooking } = useBannerContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    preferred_date: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          preferred_date: formData.preferred_date,
          message: formData.message,
          status: 'Submitted',
        }]);

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Booking request submitted successfully!');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          preferred_date: '',
          message: '',
        });
        closeBooking();
      }, 3000);
    } catch (error: any) {
      console.error('❌ Booking submission error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      toast.error(`Failed to submit booking request: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      closeBooking();
      setIsSuccess(false);
    }
  };

  if (!isBookingOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-[#2D2D3A] rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#7B1F7B] to-[#9B3F9B] p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white">Book a Consultation</h2>
          <p className="text-white/80 mt-1">Schedule your free 30-minute strategy session</p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
              <p className="text-white/60">
                We've received your request and will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Full Name <span className="text-[#F47B20]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Email Address <span className="text-[#F47B20]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Phone Number <span className="text-[#F47B20]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all"
                    placeholder="+234 903 755 1127"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all"
                    placeholder="Your Company Ltd"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all appearance-none"
                >
                  <option value="" className="bg-[#2D2D3A]">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service} className="bg-[#2D2D3A]">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Additional Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] focus:ring-1 focus:ring-[#7B1F7B] transition-all resize-none"
                    placeholder="Tell us about your project or challenges..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Schedule Free Consultation'
                )}
              </button>

              <p className="text-center text-white/40 text-xs">
                No commitment required. 30-minute strategy session.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
