'use client';

import useCopy from '@/hooks/utils/useCopy';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface ICopyClusterIdButton {
  clusterId: string;
}

export default function CopyClusterIdButton({ clusterId }: ICopyClusterIdButton) {
  const { copiedId, handleCopy } = useCopy();

  return (
    <div className='flex items-center justify-between text-xs text-gray-500 mb-2'>
      <span>ID: {clusterId.slice(0, 8)}...</span>
      <button
        onClick={() => handleCopy(clusterId)}
        className='flex items-center gap-1 text-gray-400 hover:text-gray-600'
      >
        {copiedId === clusterId ? (
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
  );
}
