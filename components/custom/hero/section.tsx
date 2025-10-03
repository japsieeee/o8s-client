'use client';

import { ArrowRightIcon, BookOpenIcon, InformationCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroBackground from './background';

export default function HeroSection() {
  return (
    <>
      <HeroBackground />

      <section className='relative flex flex-col items-center justify-center px-4 py-16 text-center sm:px-8 md:px-12 lg:px-16 lg:py-24'>
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='font-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl'
        >
          Meet <span className='text-primary'>Operations</span>
        </motion.h1>

        {/* Tagline (powered by) */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className='mt-2 block text-xs text-gray-500 sm:text-sm md:text-base'
        >
          Powered by o8s-agent &amp; o8s-server
        </motion.span>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='mt-6 max-w-xl text-base text-gray-600 sm:max-w-2xl sm:text-lg md:text-xl'
        >
          One screen. Total control. From on-prem servers to cloud clusters, streamline logging, monitoring, and
          operations in real time.
        </motion.p>

        {/* Animated Button Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='mt-10 flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4'
        >
          {/* Docs */}
          <Link
            href='/docs'
            className='flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
          >
            <BookOpenIcon className='h-5 w-5' />
            Docs
          </Link>

          {/* Login/Signup */}
          <Link
            href='/auth'
            className='flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
          >
            <UserCircleIcon className='h-5 w-5' />
            Login / Signup
          </Link>

          {/* About */}
          <Link
            href='/about'
            className='flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
          >
            <InformationCircleIcon className='h-5 w-5' />
            About this app
          </Link>

          {/* Quick Try - Highlighted CTA */}
          <Link
            href='/clusters'
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 sm:w-auto'
          >
            Quick Try
            <ArrowRightIcon className='h-5 w-5' />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
