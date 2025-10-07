'use client';

import { useClusterStore } from '@/stores/cluster';
import { ServerIcon, UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import CopyClusterIdButton from './components/copy-cluster-id';
import CreateClusterButton from './components/create-cluster';
import EditClusterNameButton from './components/edit-cluster-name';
import ClusterNameInput from './components/input-cluster-name';
import RemoveClusterButton from './components/remove-cluster';

export default function MainCluster() {
  const { clusters } = useClusterStore();

  return (
    <main className='flex-grow max-w-5xl w-full mx-auto px-6 pb-10'>
      <CreateClusterButton />

      {clusters.length === 0 ? (
        <p className='mt-10 text-gray-500 italic'>No clusters yet. Create one to get started.</p>
      ) : (
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {clusters.map((cluster) => (
            <div key={cluster.id} className='block rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-indigo-100 text-indigo-600'>
                    <ServerIcon className='w-5 h-5' />
                  </div>

                  <ClusterNameInput
                    clusterId={cluster.id}
                    clusterName={cluster.name}
                    clusterIsEditing={cluster.isEditing}
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <EditClusterNameButton clusterId={cluster.id} clusterIsEditing={cluster.isEditing} />

                  <RemoveClusterButton clusterId={cluster.id} clusterName={cluster.name} />
                </div>
              </div>

              <CopyClusterIdButton clusterId={cluster.id} />

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
  );
}
