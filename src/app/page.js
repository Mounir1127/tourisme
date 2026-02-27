import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#10202d' }}>
      <div className="max-w-2xl w-full px-6">
        <div className="rounded-lg shadow-lg p-8" style={{ backgroundColor: '#f7f7f7' }}>
          <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#10202d' }}>
            Welcome to Tourisia
          </h1>

          <p className="text-lg mb-8 text-center" style={{ color: '#10202d' }}>
            Your travel companion authentication system
          </p>

          {session ? (
            <div className="space-y-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#f0f0f0', borderLeft: '4px solid #c7a667' }}>
                <p style={{ color: '#10202d' }} className="mb-4">
                  Welcome back, <strong>{session.user?.name}</strong>!
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/dashboard"
                    className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
                    style={{ backgroundColor: '#c7a667' }}
                  >
                    Go to Dashboard
                  </Link>
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg font-medium transition-colors"
                      style={{ backgroundColor: '#10202d', color: '#f7f7f7' }}
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p style={{ color: '#10202d' }} className="text-center mb-8">
                Please login or register to continue
              </p>

              <div className="flex gap-4">
                <Link
                  href="/auth/login"
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-center text-white transition-colors"
                  style={{ backgroundColor: '#c7a667' }}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-center transition-colors"
                  style={{ backgroundColor: '#f0f0f0', color: '#10202d', border: '2px solid #c7a667' }}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
