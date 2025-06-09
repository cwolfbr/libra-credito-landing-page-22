
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '4rem',
				xl: '5rem',
			},
		},
		// Mobile-first breakpoints otimizados para dispositivos premium
		screens: {
			'xs': '375px',    // iPhone 13/14 Standard
			'sm': '414px',    // iPhone Plus/Pro Max
			'md': '768px',    // iPad Mini
			'lg': '1024px',   // iPad Pro / Desktop básico
			'xl': '1280px',   // Desktop padrão
			'2xl': '1536px',  // Desktop grande
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				heading: ['Playfair Display', 'Georgia', 'serif'],
				body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			// Sistema tipográfico premium com line-height otimizado
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.025em' }],
				'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.015em' }],
				'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.005em' }],
				'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '0em' }],
				'2xl': ['1.5rem', { lineHeight: '2.125rem', letterSpacing: '-0.005em' }],
				'3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.01em' }],
				'4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.015em' }],
				'5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.02em' }],
				'6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.025em' }],
			},
			// Espaçamentos otimizados para touch
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			// Altura mínima para elementos touch (48px recomendado)
			minHeight: {
				'touch': '48px',
				'touch-lg': '56px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				libra: {
					// Paleta premium aprimorada
					navy: '#1a365d',      // Azul profundo mais sofísticado
					blue: '#2563eb',      // Azul moderno e vibrante
					gold: '#f59e0b',      // Ouro premium
					silver: '#f1f5f9',    // Cinza suave
					light: '#fefefe',     // Branco premium
					accent: {
						50: '#eff6ff',
						100: '#dbeafe',
						200: '#bfdbfe',
						300: '#93c5fd',
						400: '#60a5fa',
						500: '#3b82f6',
						600: '#2563eb',
						700: '#1d4ed8',
						800: '#1e40af',
						900: '#1e3a8a'
					},
					neutral: {
						50: '#fafafa',
						100: '#f5f5f5',
						200: '#e5e5e5',
						300: '#d4d4d4',
						400: '#a3a3a3',
						500: '#737373',
						600: '#525252',
						700: '#404040',
						800: '#262626',
						900: '#171717'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out'
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(135deg, #1a365d 0%, #2563eb 50%, #1e40af 100%)',
				'premium-gradient': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
				'section-gradient': 'linear-gradient(180deg, #fefefe 0%, #f1f5f9 100%)'
			},
			boxShadow: {
				'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'
			},
			blur: {
				'xs': '2px',
				'glass': '16px'
			}
		}
	},
	plugins: [],
} satisfies Config;
