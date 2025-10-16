'use client';

import { useAgentStore } from '@/stores/agent';
import { useClusterStore } from '@/stores/cluster';
import { TrashIcon } from '@heroicons/react/24/outline';

interface IRemoveClusterButton {
  clusterId: string;
  clusterName: string;
}

export default function RemoveClusterButton({ clusterId, clusterName }: IRemoveClusterButton) {
  const { removeCluster } = useClusterStore();
  const { listAgentIdsByCluster, removeAgent } = useAgentStore();
  const handleRemove = () => {
    const confirmDelete = window.confirm(`Are you sure you want to remove the cluster "${clusterName}"?`);
    if (confirmDelete) {
      const agentIds = listAgentIdsByCluster(clusterId);

      removeCluster(clusterId);

      for (const agentId of agentIds) {
        removeAgent(agentId);
      }
    }
  };

  return (
    <button onClick={() => handleRemove()} className='text-gray-400 hover:text-red-500 transition-colors'>
      <TrashIcon className='w-5 h-5' />
    </button>
  );
}
