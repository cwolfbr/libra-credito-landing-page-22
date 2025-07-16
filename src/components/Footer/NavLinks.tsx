import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/simulacao', label: 'Simulação' },
  { to: '/vantagens', label: 'Vantagens' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/blog', label: 'Blog' },
  { to: '/parceiros', label: 'Parceiros' },
];

const NavLinks: React.FC = () => (
  <div className="text-left">
    <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4 text-white">Navegação</h3>
    <ul className="space-y-1 md:space-y-2">
      {navItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className="text-white/80 hover:text-white transition-colors text-xs md:text-base"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NavLinks;
