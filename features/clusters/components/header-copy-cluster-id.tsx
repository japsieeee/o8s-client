'use client';

import useCopy from '@/hooks/utils/useCopy';
import { CheckIcon, ClipboardIcon, ServerIcon } from '@heroicons/react/24/outline';

interface ICopyClusterIdButton {
  clusterId: string;
  clusterName: string;
}

export default function HeaderCopyClusterIdButton({ clusterId, clusterName }: ICopyClusterIdButton) {
  const { copiedId, handleCopy } = useCopy();

  return (
    <div className='mt-4 flex flex-wrap items-center gap-3'>
          <ServerIcon className='w-6 h-6 text-indigo-600' />
          <h1 className='text-2xl font-semibold text-gray-800'>{clusterName}</h1>
          <span className='text-gray-400 text-sm'>({clusterId.slice(0, 6)}...)</span>
          <button
            onClick={() => handleCopy(clusterId)}
            className='flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700'
          >
            {copiedId === clusterId ? (
              <>
                <CheckIcon className='h-4 w-4 text-green-500' />
                Copied
              </>
            ) : (
              <>
                <ClipboardIcon className='h-4 w-4' />
                Copy
              </>
            )}
          </button>
        </div>
  );
}
