'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, ChefHat, ShoppingCart, MoreHorizontal } from 'lucide-react';

interface BottomNavProps {
  pendingMarketCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ pendingMarketCount = 0 }) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Hoy',
      href: '/',
      icon: Home,
      active: pathname === '/'
    },
    {
      label: 'Plan',
      href: '/plan',
      icon: CalendarDays,
      active: pathname.startsWith('/plan')
    },
    {
      label: 'Recetas',
      href: '/recetas',
      icon: ChefHat,
      active: pathname.startsWith('/recetas')
    },
    {
      label: 'Mercado',
      href: '/mercado',
      icon: ShoppingCart,
      active: pathname.startsWith('/mercado'),
      badge: pendingMarketCount > 0 ? pendingMarketCount : undefined
    },
    {
      label: 'Más',
      href: '/mas',
      icon: MoreHorizontal,
      active: pathname.startsWith('/mas') || pathname.startsWith('/hogar')
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg">
      <div className="max-w-lg md:max-w-xl mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-14 py-1 transition-all rounded-xl ${
                item.active
                  ? 'text-brand-600 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    item.active ? 'stroke-[2.5px] text-brand-600' : 'stroke-2'
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${item.active ? 'font-bold text-brand-700' : ''}`}>
                {item.label}
              </span>
              {item.active && (
                <span className="w-1.5 h-1.5 bg-brand-600 rounded-full mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
