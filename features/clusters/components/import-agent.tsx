'use client';

import { useAgentStore } from '@/stores/agent';
import { useClusterStore } from '@/stores/cluster';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ImportAgentButton() {
  const [open, setOpen] = useState(false);
  const [clusterId, setClusterId] = useState('');
  const [agentId, setAgentId] = useState('');

  const { addCluster } = useClusterStore();
  const { addAgent } = useAgentStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clusterId || !agentId) return;

    // Create cluster
    addCluster(); // This will create a new cluster with a generated name
    const finalClusterId = clusterId; // Use the user-provided clusterId

    // Add agent with exact agentId
    addAgent(finalClusterId, agentId, agentId);

    // Reset inputs
    setClusterId('');
    setAgentId('');
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors'
      >
        <PlusCircleIcon className='w-5 h-5' />
        Import Agent
      </button>

      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
          <div className='bg-white rounded-lg w-full max-w-sm p-5 relative'>
            <button onClick={() => setOpen(false)} className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'>
              <XMarkIcon className='w-5 h-5' />
            </button>

            <h2 className='text-md font-medium mb-4'>Import Agent</h2>

            <form onSubmit={handleSubmit} className='space-y-3'>
              <input
                type='text'
                placeholder='Cluster ID'
                value={clusterId}
                onChange={(e) => setClusterId(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm'
                required
              />

              <input
                type='text'
                placeholder='Agent ID'
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm'
                required
              />

              <button
                type='submit'
                className='w-full px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors'
              >
                Import Agent
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
