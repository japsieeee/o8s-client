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
    </>
  );
}
