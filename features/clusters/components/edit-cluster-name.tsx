'use client';

import { useClusterStore } from '@/stores/cluster';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface IEditClusterNameButton {
  clusterId: string;
  clusterIsEditing?: boolean;
}

export default function EditClusterNameButton({ clusterId, clusterIsEditing }: IEditClusterNameButton) {
  const { toggleEdit } = useClusterStore();

  return (
    <button onClick={() => toggleEdit(clusterId, !clusterIsEditing)} className='text-gray-400 hover:text-gray-600'>
      <PencilSquareIcon className='w-5 h-5' />
    </button>
  );
}
