import MainCluster from './main-cluster';

export default function ClusterOverview() {
  return (
    <div className='bg-gray-50 text-gray-900 font-sans flex flex-col overflow-x-hidden'>
      <header className='max-w-5xl w-full mx-auto px-6 pt-10 pb-6 flex-shrink-0'>
        <h1 className='text-3xl font-heading font-bold flex items-center gap-2'>🚀 Monitoring Clusters</h1>
        <p className='mt-2 text-gray-600'>Organize and manage your agents inside clusters</p>
      </header>

      <MainCluster />
    </div>
  );
}
