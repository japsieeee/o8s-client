'use client';

export default function AgentDetail({ clusterId, agentId }: { clusterId: string; agentId: string }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white p-8'>
      <h1 className='text-3xl font-extrabold mb-6'>Agent Details</h1>

      <div className='rounded-2xl p-6 bg-white/10 backdrop-blur-md shadow-lg border border-white/10'>
        <p className='text-lg font-semibold'>Cluster: {clusterId}</p>
        <p className='text-lg font-semibold'>Agent: {agentId}</p>

        <div className='mt-6 grid gap-4'>
          <div className='rounded-lg p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 shadow'>
            <p className='font-semibold'>CPU Usage</p>
            <p className='text-gray-300'>--%</p>
          </div>
          <div className='rounded-lg p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 shadow'>
            <p className='font-semibold'>Memory Usage</p>
            <p className='text-gray-300'>--%</p>
          </div>
          <div className='rounded-lg p-4 bg-gradient-to-r from-pink-500/20 to-pink-600/20 shadow'>
            <p className='font-semibold'>Storage</p>
            <p className='text-gray-300'>-- GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
