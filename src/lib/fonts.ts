import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';

// Configuração otimizada da Montserrat
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  // Apenas os weights que usamos
  weight: ['400', '500', '600', '700'],
}); 