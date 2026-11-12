'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'All Meetings', href: '/meetings' },
  { name: 'This Sunday', href: '/meetings/current' },
  { name: 'Admin', href: '/meetings/new' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-2">
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

