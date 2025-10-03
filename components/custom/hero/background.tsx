'use client';

import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <>
      {/* Top-left floating circle */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className='absolute -top-20 -left-20 hidden h-60 w-60 rounded-full bg-primary/20 blur-3xl sm:block lg:h-72 lg:w-72'
      />

      {/* Bottom-right floating circle */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className='absolute -bottom-20 -right-20 hidden h-60 w-60 rounded-full bg-accent/20 blur-3xl sm:block lg:h-72 lg:w-72'
      />

      {/* Mid-left smaller bubble */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className='absolute left-10 top-1/2 hidden h-40 w-40 rounded-full bg-secondary/20 blur-2xl sm:block lg:h-48 lg:w-48'
      />

      {/* Top-right bubble */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={{ y: [10, -10, 10], x: [-15, 15, -15] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className='absolute top-10 right-32 hidden h-52 w-52 rounded-full bg-primary/10 blur-3xl sm:block lg:h-64 lg:w-64'
      />

      {/* Center floating small bubble */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={{ y: [-25, 25, -25], x: [0, -10, 10, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className='absolute top-1/3 left-1/2 hidden h-28 w-28 rounded-full bg-accent/10 blur-2xl sm:block lg:h-36 lg:w-36'
      />
    </>
  );
}
