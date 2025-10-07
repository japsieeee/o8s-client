'use client';

import { useAgentStore } from '@/stores/agent';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ICreateAgentButton {
  clusterId: string;
}

export default function CreateAgentButton({ clusterId }: ICreateAgentButton) {
  const { addAgent } = useAgentStore();
  const handleCreateAgent = () => addAgent(clusterId);

  return (
    <button
      onClick={handleCreateAgent}
      className='flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all'
    >
      <PlusIcon className='w-5 h-5' />
      Add Agent
    </button>
  );
}
