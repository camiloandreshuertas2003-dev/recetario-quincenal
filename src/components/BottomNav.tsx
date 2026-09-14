'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, ChefHat, ShoppingCart, Users } from 'lucide-react';

interface BottomNavProps {
  pendingMarketCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ pendingMarketCount = 0 }) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Menú',
      href: '/',
      icon: CalendarDays,
      active: pathname === '/'
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
      label: 'Hogar',
      href: '/hogar',
      icon: Users,
      active: pathname.startsWith('/hogar')
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-16 py-1 transition-all rounded-xl ${
                item.active
                  ? 'text-brand-700 font-semibold scale-105'
                  : 'text-slate-500 hover:text-slate-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    item.active ? 'stroke-[2.5px]' : 'stroke-2'
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
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
