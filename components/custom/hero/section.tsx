'use client';

import {
  ArrowRightIcon,
  BookOpenIcon,
  InformationCircleIcon,
  UserCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroBackground from './background';

export default function HeroSection() {
  return (
    <>
      <HeroBackground />

      <section className='relative flex flex-col items-center justify-center px-4 py-16 text-center sm:px-8 md:px-12 lg:px-16 lg:py-24'>
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='font-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl'
        >
          Meet <span className='text-primary'>Operations</span>
        </motion.h1>

        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className='mt-2 block text-xs text-gray-500 sm:text-sm md:text-base'
        >
          Powered by o8s-agent &amp; o8s-server
        </motion.span>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='mt-6 max-w-xl text-base text-gray-600 sm:max-w-2xl sm:text-lg md:text-xl'
        >
          One screen. Total control. From on-prem servers to cloud clusters — streamline logging, monitoring, and
          operations in real time.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='
            mt-10 flex w-full max-w-3xl flex-col items-center gap-2
            sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2
            lg:flex-nowrap lg:justify-center lg:gap-3
          '
        >
          {/* Docs */}
          <HeroButton href='/docs' icon={<BookOpenIcon className='h-5 w-5' />} text='Docs' />

          {/* Login */}
          <HeroButton href='/login' icon={<UserCircleIcon className='h-5 w-5' />} text='Login' />

          {/* Sign Up */}
          <HeroButton href='/signup' icon={<UserPlusIcon className='h-5 w-5' />} text='Sign Up' />

          {/* About */}
          <HeroButton href='/about' icon={<InformationCircleIcon className='h-5 w-5' />} text='About' />

          {/* Quick Try */}
          <Link
            href='/clusters'
            className='flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1'
          >
            Quick Try
            <ArrowRightIcon className='h-5 w-5' />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

/* ✅ Reusable Button Component */
function HeroButton({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      href={href}
      className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1'
    >
      {icon}
      {text}
    </Link>
  );
}
