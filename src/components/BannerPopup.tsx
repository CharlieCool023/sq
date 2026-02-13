import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useBannerContext } from '@/contexts/BannerContext';

// Sample banner data - in production, this would come from the database
const sampleBanners = [
  {
    id: '1',
    title: 'Free Business Audit',
    description: 'Schedule a complimentary 60-second business audit to identify growth opportunities.',
    image_url: null,
    link_url: '/contact',
    delay_seconds: 3,
  },
];

const BannerPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBanner] = useState(sampleBanners[0]);
  const { openBooking } = useBannerContext();

  useEffect(() => {
    // Check if banner was already shown in this session
    const hasShownBanner = sessionStorage.getItem('sq_banner_shown');
    
    if (!hasShownBanner && currentBanner) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('sq_banner_shown', 'true');
      }, currentBanner.delay_seconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentBanner]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = () => {
    handleClose();
    if (currentBanner?.link_url === '/contact') {
      openBooking();
    }
  };

  if (!isVisible || !currentBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
      <div className="bg-gradient-to-br from-[#7B1F7B] to-[#5A165A] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5">
          {/* Content */}
          <div className="pr-6">
            <h3 className="text-lg font-bold text-white mb-2">
              {currentBanner.title}
            </h3>
            <p className="text-white/80 text-sm mb-4">
              {currentBanner.description}
            </p>
            
            <button
              onClick={handleAction}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F47B20] text-white text-sm font-medium rounded-lg hover:bg-[#FF9A4D] transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#F47B20]/20 rounded-full blur-2xl" />
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      </div>
    </div>
  );
};

export default BannerPopup;
