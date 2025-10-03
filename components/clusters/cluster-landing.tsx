'use client';

import useCopy from '@/hooks/utils/useCopy';
import { useClusterStore } from '@/stores/cluster';
import { CheckIcon, ClipboardIcon, PencilSquareIcon, ServerIcon, UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ClusterLanding() {
  const { copiedId, handleCopy } = useCopy();
  const { clusters, addCluster, updateCluster, toggleEdit } = useClusterStore();

  const handleKeyDown = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      toggleEdit(id, false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 font-sans'>
      {/* Header */}
      <header className='max-w-5xl mx-auto px-6 py-10'>
        <h1 className='text-3xl font-heading font-bold flex items-center gap-2'>🚀 Monitoring Clusters</h1>
        <p className='mt-2 text-gray-600'>Organize and manage your agents inside clusters</p>
      </header>

      {/* Main */}
      <main className='max-w-5xl mx-auto px-6'>
        <button
          onClick={addCluster}
          className='px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors'
        >
          + Create Cluster
        </button>

        {clusters.length === 0 ? (
          <p className='mt-10 text-gray-500 italic'>No clusters yet. Create one to get started.</p>
        ) : (
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {clusters.map((cluster) => (
              <div
                key={cluster.id}
                className='block rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg bg-indigo-100 text-indigo-600'>
                      <ServerIcon className='w-5 h-5' />
                    </div>

                    {cluster.isEditing ? (
                      <input
                        type='text'
                        value={cluster.name}
                        onChange={(e) => updateCluster(cluster.id, e.target.value)}
                        onBlur={() => toggleEdit(cluster.id, false)}
                        onKeyDown={(e) => handleKeyDown(cluster.id, e)}
                        className='border rounded px-2 py-1 text-sm focus:outline-indigo-500'
                        autoFocus
                      />
                    ) : (
                      <h2
                        className='font-heading font-semibold text-lg cursor-pointer'
                        onClick={() => toggleEdit(cluster.id, true)}
                      >
                        {cluster.name}
                      </h2>
                    )}
                  </div>
                  <button
                    onClick={() => toggleEdit(cluster.id, !cluster.isEditing)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <PencilSquareIcon className='w-5 h-5' />
                  </button>
                </div>

                {/* Cluster ID with Copy Button */}
                <div className='flex items-center justify-between text-xs text-gray-500 mb-2'>
                  <span>ID: {cluster.id.slice(0, 8)}...</span>
                  <button
                    onClick={() => handleCopy(cluster.id)}
                    className='flex items-center gap-1 text-gray-400 hover:text-gray-600'
                  >
                    {copiedId === cluster.id ? (
                      <>
                        <CheckIcon className='h-4 w-4 text-green-500' />
                        <span className='text-green-500'>Copied</span>
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className='h-4 w-4' />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <Link
                  href={{
                    pathname: `/clusters/${cluster.id}`,
                    query: cluster.name ? { clusterName: cluster.name } : undefined,
                  }}
                  className='flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline'
                >
                  <UsersIcon className='h-4 w-4' />
                  Manage agents
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
