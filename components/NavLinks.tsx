'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
  signOutAction?: React.ReactNode;
}

export default function NavLinks({ user, signOutAction }: NavLinksProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: 'This Sunday', href: '/meetings/current' },
    { name: 'Admin', href: '/meetings/new' },
  ];

  return (
    <nav aria-label="Main Navigation" className="flex flex-wrap items-center gap-1 sm:gap-2">
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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

      {user ? (
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
            {user.name || user.email}
          </span>
          {signOutAction}
        </div>
      ) : (
        <Link
          href="/login"
          className="ml-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}
