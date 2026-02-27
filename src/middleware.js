import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth(
  function middleware(req) {
    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/login',
    },
  }
);

// Protect routes that require authentication
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
