'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#10202d' }}>
      <div className="w-full max-w-md p-8" style={{ backgroundColor: '#f7f7f7' }}>
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#10202d' }}>
          Login
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#10202d' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: '#c7a667',
                '--tw-ring-color': '#c7a667',
              }}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#10202d' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: '#c7a667',
                '--tw-ring-color': '#c7a667',
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#c7a667' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b8935a')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#c7a667')}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center" style={{ color: '#10202d' }}>
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-medium hover:opacity-80" style={{ color: '#c7a667' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
