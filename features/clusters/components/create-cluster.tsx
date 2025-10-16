'use client';

import { useClusterStore } from '@/stores/cluster';

export default function CreateClusterButton() {
  const { addCluster } = useClusterStore();

  return (
    <button
      onClick={() => addCluster()}
      className='px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors'
    >
      + Create Cluster
    </button>
  );
}
