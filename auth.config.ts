import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Protected leader administration routes
      const isProtected =
        pathname === '/meetings/new' ||
        pathname.startsWith('/meetings/') && pathname.endsWith('/edit');

      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Automatically redirects to /login with callbackUrl
      }

      // If user is already logged in and navigates to /login, redirect to /meetings
      if (isLoggedIn && pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Configured with credentials in auth.ts
} satisfies NextAuthConfig;
