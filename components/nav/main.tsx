import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MainNavbar() {
  return (
    <nav className='w-full bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Left: Branding */}
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <HomeIcon className='w-6 h-6 text-indigo-600' />
            <span className='font-heading text-xl font-bold text-indigo-600'>O8S</span>
          </div>
        </Link>

        {/* Center: Nav Links */}
        <div className='hidden md:flex items-center gap-6 text-gray-700'>
          <Link href='/docs' className='hover:text-indigo-600 transition-colors'>
            Docs
          </Link>
          <Link href='/about' className='hover:text-indigo-600 transition-colors'>
            About
          </Link>
        </div>

        {/* Right: CTA buttons */}
        <div className='flex items-center gap-3'>
          <Link href='/login' className='px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors'>
            Log in
          </Link>
          <Link
            href='/signup'
            className='px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors'
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
