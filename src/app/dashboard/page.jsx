'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#10202d' }}>
        <div style={{ color: '#f7f7f7' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#10202d' }}>
      <nav className="py-4 px-6" style={{ backgroundColor: '#f7f7f7' }}>
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold" style={{ color: '#10202d' }}>
            Tourisia Dashboard
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: '#c7a667' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b8935a')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#c7a667')}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="rounded-lg p-8" style={{ backgroundColor: '#f7f7f7' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#10202d' }}>
            Welcome, {session?.user?.name || 'User'}!
          </h2>
          
          <div className="space-y-4">
            <p style={{ color: '#10202d' }}>
              <strong>Email:</strong> {session?.user?.email}
            </p>
            <p style={{ color: '#10202d' }}>
              <strong>User ID:</strong> {session?.user?.id}
            </p>
          </div>

          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: '#10202d', color: '#f7f7f7' }}>
            <h3 className="text-xl font-semibold mb-4">Session Information</h3>
            <pre className="p-4 bg-black rounded overflow-auto text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
