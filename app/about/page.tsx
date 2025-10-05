import MainNavbar from '@/components/nav/main';
import { ChartBarIcon, CommandLineIcon, GlobeAltIcon, ServerIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'About | DevOps Monitoring Tool',
  description:
    'A free logging and monitoring tool for developers and DevOps teams to observe and manage their servers — both cloud and on-premise.',
};

export default async function About() {
  return (
    <>
      <MainNavbar />
      <main className='bg-gray-50 text-gray-900'>
        <section className='max-w-4xl mx-auto px-6 py-20'>
          <div className='text-center space-y-4 mb-12'>
            <ServerIcon className='w-12 h-12 text-indigo-600 mx-auto' />
            <h1 className='text-3xl font-bold tracking-tight'>About This App</h1>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              A free and open monitoring tool built for developers and DevOps engineers who want to observe, analyze,
              and manage their servers — all from a single, unified dashboard.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 gap-8 text-gray-700'>
            <div className='flex flex-col items-center text-center space-y-3'>
              <ChartBarIcon className='w-10 h-10 text-indigo-500' />
              <h2 className='font-semibold text-lg'>Real-Time Metrics</h2>
              <p className='text-sm text-gray-500'>
                Monitor CPU, memory, storage, and network usage for all your servers in real-time — whether in the cloud
                or on-prem.
              </p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3'>
              <GlobeAltIcon className='w-10 h-10 text-indigo-500' />
              <h2 className='font-semibold text-lg'>Cloud & On-Prem Ready</h2>
              <p className='text-sm text-gray-500'>
                Works seamlessly across your cloud infrastructure or local servers, giving you unified visibility.
              </p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3'>
              <CommandLineIcon className='w-10 h-10 text-indigo-500' />
              <h2 className='font-semibold text-lg'>Server Control</h2>
              <p className='text-sm text-gray-500'>
                Beyond monitoring — securely control and interact with your servers directly from this dashboard.
              </p>
            </div>

            <div className='flex flex-col items-center text-center space-y-3'>
              <ServerIcon className='w-10 h-10 text-indigo-500' />
              <h2 className='font-semibold text-lg'>Developer Friendly</h2>
              <p className='text-sm text-gray-500'>
                Designed for engineers who prefer clarity and control. Simple, minimal, and built with performance in
                mind.
              </p>
            </div>
          </div>

          <div className='text-center mt-16 border-t pt-8 text-sm text-gray-500'>
            <p>© {new Date().getFullYear()} o8s — Free & Open DevOps Monitoring Tool</p>
          </div>
        </section>
      </main>
    </>
  );
}
