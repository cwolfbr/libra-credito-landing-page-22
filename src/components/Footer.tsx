import React from 'react';
import WaveSeparator from '@/components/ui/WaveSeparator';
import NavLinks from './Footer/NavLinks';
import SocialLinks from './Footer/SocialLinks';
import LegalInfo from './Footer/LegalInfo';
import RASeal from '@/components/RASeal';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <WaveSeparator variant="footer" height="md" />
      
      <footer className="bg-[#003399] text-white">
        <div className="container mx-auto py-6 lg:py-8 px-4">
          <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8 mb-6 lg:mb-8 items-start">
            <NavLinks />

            <div className="text-center flex items-center justify-center h-full">
              <img
                src="/logo-libra.png"
                alt="Libra Crédito"
                className="h-24 md:h-20 lg:h-24 xl:h-32 w-auto max-w-full"
              />
            </div>

            <SocialLinks scrollToTop={scrollToTop} />

            <div className="col-span-3 md:col-span-1 md:col-start-3 flex justify-center md:justify-end mt-4">
              <RASeal />
            </div>
          </div>

          <LegalInfo />
        </div>
      </footer>
    </>
  );
};

export default Footer;