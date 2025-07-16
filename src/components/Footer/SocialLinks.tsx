import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, ChevronUp } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';

const socialLinks = [
  { href: 'https://www.facebook.com/LibraCreditoOficial/', label: 'Facebook', icon: Facebook },
  { href: 'https://www.instagram.com/libracredito/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.linkedin.com/company/libracredito/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.youtube.com/channel/UCXpuj7LlTLT_kdbwwJHS0qA', label: 'YouTube', icon: Youtube },
  { href: 'https://www.tiktok.com/@libracredito', label: 'TikTok', icon: TikTokIcon },
];

interface SocialLinksProps {
  scrollToTop: () => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ scrollToTop }) => (
  <div className="text-right">
    <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4 text-white">Redes Sociais</h3>
    {/* Layout mobile */}
    <div className="flex flex-col items-end md:hidden mb-2">
      <div className="grid grid-cols-2 gap-1 w-fit" style={{ direction: 'rtl' }}>
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/70 transition-colors"
            aria-label={label}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <button
          onClick={scrollToTop}
          className="text-white hover:text-white/70 transition-colors"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Layout desktop */}
    <div className="hidden md:flex justify-end items-center gap-4 mb-4">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/70 transition-colors"
          aria-label={label}
        >
          <Icon className="w-7 h-7" />
        </a>
      ))}
    </div>

    <button
      onClick={scrollToTop}
      className="hidden md:flex items-center gap-1 md:gap-2 ml-auto text-white/80 hover:text-white transition-colors text-xs md:text-sm"
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
      <span className="hidden md:inline">Voltar ao topo</span>
    </button>
  </div>
);

export default SocialLinks;
