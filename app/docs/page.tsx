import DocCard from '@/components/custom/card/docs-card';
import MainNavbar from '@/components/nav/main';
import {
  ArrowDownTrayIcon,
  CloudIcon,
  Cog8ToothIcon,
  CommandLineIcon,
  KeyIcon,
  LifebuoyIcon,
  PlayCircleIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | o8s',
  description: 'Official o8s documentation — setup, configuration, and deployment guides for your monitoring platform.',
};

export default function Docs() {
  return (
    <>
      <MainNavbar />

      <main className='min-h-screen bg-gray-50 text-gray-800 font-sans'>
        {/* Header */}
        <header className='max-w-5xl mx-auto px-6 py-10'>
          <h1 className='text-3xl font-bold flex items-center gap-2 text-indigo-700'>
            <CommandLineIcon className='w-7 h-7 text-indigo-600' />
            o8s Documentation
          </h1>
          <p className='mt-2 text-gray-600 text-sm'>
            Learn how to install, configure, and get started with <strong>o8s</strong> — your open DevOps monitoring and
            control platform.
          </p>
        </header>

        {/* Docs Sections */}
        <section className='max-w-5xl mx-auto px-6 space-y-10 pb-16'>
          <DocCard
            icon={<ArrowDownTrayIcon className='w-5 h-5 text-indigo-600' />}
            title='Download'
            description="Get o8s from the official GitHub releases page. It's available for Linux, macOS, and Windows."
            code='git clone https://github.com/your-org/o8s.git'
          />

          <DocCard
            icon={<WrenchScrewdriverIcon className='w-5 h-5 text-indigo-600' />}
            title='Pre-setup'
            description='Before running o8s, make sure your system meets these requirements:'
            list={[
              'Node.js 18 or higher',
              'Docker (optional, for containerized deployment)',
              'Access to your monitored servers (SSH or Agent setup)',
              'Port 3000 available for the web dashboard',
            ]}
          />

          <DocCard
            icon={<PlayCircleIcon className='w-5 h-5 text-indigo-600' />}
            title='Get Started'
            description='After downloading, run the following commands to start the development dashboard:'
            code={`cd o8s
npm install
npm run dev`}
            note='Then open your browser at http://localhost:3000'
          />

          <DocCard
            icon={<ServerStackIcon className='w-5 h-5 text-indigo-600' />}
            title='Configure Agents'
            description='Agents are lightweight services that collect metrics and send them to your o8s dashboard.'
            code={`# Example: Install agent on a remote server
curl -fsSL https://o8s.sh/install-agent.sh | bash`}
          />

          <DocCard
            icon={<KeyIcon className='w-5 h-5 text-indigo-600' />}
            title='Environment Variables'
            description='Configure o8s through environment variables. Create a `.env.local` file in your root directory.'
            code={`O8S_PORT=3000
O8S_DB_URL=postgres://user:password@localhost:5432/o8s
O8S_JWT_SECRET=your-secret-key
O8S_LOG_LEVEL=info`}
          />

          <DocCard
            icon={<Cog8ToothIcon className='w-5 h-5 text-indigo-600' />}
            title='API & Integrations'
            description='You can integrate o8s with your CI/CD pipelines, alert systems, or other observability tools.'
            list={[
              'Expose metrics via REST or WebSocket endpoints',
              'Use webhooks for real-time alerts',
              'Integrate with Grafana or Prometheus (coming soon)',
            ]}
          />

          <DocCard
            icon={<CloudIcon className='w-5 h-5 text-indigo-600' />}
            title='Cloud & On-Prem Deployment'
            description='o8s runs anywhere — locally, on-premise, or in the cloud.'
            list={[
              'Use Docker Compose for one-command deployment',
              'Set up Nginx for HTTPS reverse proxy',
              'Use PM2 or systemd for persistent processes',
            ]}
          />

          <DocCard
            icon={<ShieldCheckIcon className='w-5 h-5 text-indigo-600' />}
            title='Security & Privacy'
            description='All communication between agents and the o8s dashboard is encrypted. Your metrics are never sent to external servers — everything stays within your environment.'
          />

          <DocCard
            icon={<LifebuoyIcon className='w-5 h-5 text-indigo-600' />}
            title='Troubleshooting'
            description='Having issues? Try the following:'
            list={[
              'Ensure Node.js and npm are properly installed',
              'Check that the ports are not being used by other services',
              'Run `npm run build` before deploying in production mode',
              'Join our GitHub discussions for support',
            ]}
          />

          <footer className='pt-10 text-center text-sm text-gray-500'>
            © 2025 o8s — Free & Open DevOps Monitoring Tool
          </footer>
        </section>
      </main>
    </>
  );
}
