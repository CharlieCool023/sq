import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useBannerContext } from '@/contexts/BannerContext';
import { supabase } from '@/lib/database';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  type: string;
  is_active: boolean;
  display_order: number;
  delay_seconds: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const BannerPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openBooking } = useBannerContext();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase
          .from('banners')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching banners:', error);
          return;
        }

        if (data && data.length > 0) {
          setBanners(data);
          showNextBanner(data);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);

  const showNextBanner = (bannerList: Banner[]) => {
    const hasShownBanner = sessionStorage.getItem('sq_banner_shown');
    
    if (!hasShownBanner && bannerList.length > 0) {
      const banner = bannerList[currentIndex];
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('sq_banner_shown', 'true');
      }, (banner.delay_seconds || 3) * 1000);

      return () => clearTimeout(timer);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Show next banner in session
    if (currentIndex < banners.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsVisible(true), 1000);
    }
  };

  const handleAction = () => {
    handleClose();
    const banner = banners[currentIndex];
    if (banner?.button_link === '/contact') {
      openBooking();
    } else if (banner?.button_link) {
      window.location.href = banner.button_link;
    }
  };

  const currentBanner = banners[currentIndex];

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
              {currentBanner.button_text || 'Learn More'}
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
