import React, { createContext, useContext, useState, useCallback } from 'react';

interface BannerContextType {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  return (
    <BannerContext.Provider value={{ isBookingOpen, openBooking, closeBooking }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBannerContext must be used within a BannerProvider');
  }
  return context;
};
