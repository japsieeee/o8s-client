'use client';

import { useClusterStore } from '@/stores/cluster';
import { TrashIcon } from '@heroicons/react/24/outline';

interface IRemoveClusterButton {
  clusterId: string;
  clusterName: string;
}

export default function RemoveClusterButton({ clusterId, clusterName }: IRemoveClusterButton) {
  const { removeCluster } = useClusterStore();
  const handleRemove = () => {
    const confirmDelete = window.confirm(`Are you sure you want to remove the cluster "${clusterName}"?`);
    if (confirmDelete) removeCluster(clusterId);
  };

  return (
    <button onClick={() => handleRemove()} className='text-gray-400 hover:text-red-500 transition-colors'>
      <TrashIcon className='w-5 h-5' />
    </button>
  );
}
