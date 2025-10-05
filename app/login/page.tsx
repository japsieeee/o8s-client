import MainNavbar from '@/components/nav/main';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login | o8s',
  description: 'Access your o8s monitoring dashboard securely.',
};

export default function LoginPage() {
  return (
    <>
      <div className='fixed w-full'>
        <MainNavbar />
      </div>
      <main className='min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-4 font-sans'>
        <div className='max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-sm overflow-hidden'>
          {/* Left Section */}
          <div className='hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-indigo-500 text-white p-10 space-y-4'>
            <h2 className='text-3xl font-semibold'>Welcome back 👋</h2>
            <p className='text-sm text-indigo-100'>
              Monitor, analyze, and control your infrastructure in one place with o8s.
            </p>
          </div>

          {/* Right Section */}
          <div className='p-8 sm:p-10 flex flex-col justify-center space-y-6'>
            <div>
              <h1 className='text-2xl font-semibold'>Sign in to your account</h1>
              <p className='text-sm text-gray-500 mt-1'>Continue to your o8s dashboard</p>
            </div>

            <form className='space-y-5'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input
                  type='email'
                  placeholder='you@example.com'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full bg-indigo-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors'
              >
                Login
              </button>
            </form>

            <p className='text-center text-sm text-gray-500'>
              Don’t have an account?{' '}
              <Link href='/signup' className='text-indigo-600 hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
