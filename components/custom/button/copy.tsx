'use client';

import useCopy from '@/hooks/utils/useCopy';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

export default function CopyButton({ text }: { text: string }) {
  const { copiedId, handleCopy } = useCopy();

  return (
    <button
      onClick={() => handleCopy(text)}
      className='flex items-center gap-1 text-gray-300 hover:text-white bg-gray-800/70 px-2 py-1 rounded-md text-xs transition-colors'
    >
      {copiedId === text ? (
        <>
          <CheckIcon className='h-4 w-4 text-green-400' />
          <span>Copied</span>
        </>
      ) : (
        <>
          <ClipboardIcon className='h-4 w-4' />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
