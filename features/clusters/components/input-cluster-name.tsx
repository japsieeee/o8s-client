'use client';

import { useClusterStore } from '@/stores/cluster';

interface IClusterNameInput {
  clusterIsEditing?: boolean;
  clusterName: string;
  clusterId: string;
}

export default function ClusterNameInput({ clusterId, clusterName, clusterIsEditing }: IClusterNameInput) {
  const { updateCluster, toggleEdit } = useClusterStore();

  const handleKeyDown = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      toggleEdit(id, false);
    }
  };

  return (
    <>
      {clusterIsEditing ? (
        <input
          type='text'
          value={clusterName}
          onChange={(e) => updateCluster(clusterId, e.target.value)}
          onBlur={() => toggleEdit(clusterId, false)}
          onKeyDown={(e) => handleKeyDown(clusterId, e)}
          className='border rounded px-2 py-1 text-sm focus:outline-indigo-500'
          autoFocus
        />
      ) : (
        <h2 className='font-heading font-semibold text-lg cursor-pointer' onClick={() => toggleEdit(clusterId, true)}>
          {clusterName}
        </h2>
      )}
    </>
  );
}
