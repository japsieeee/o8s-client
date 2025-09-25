export default function LandingPageOverlay() {
  return (
    <section className='relative flex flex-col items-center justify-center px-6 py-20 text-center sm:px-12 bg-gradient-to-br from-primary-light/20 to-accent-light/30'>
      {/* Subtle diagonal divider */}
      <div className='absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-white/70' />

      <h1 className='font-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl relative'>
        Welcome to <span className='text-primary'>Your App</span>
      </h1>
    </section>
  );
}
