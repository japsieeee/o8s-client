'use client';

import { MemoryCardProps } from './types/memory.types';

export default function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <div className='rounded-2xl border border-gray-200 shadow p-4'>
      <h2 className='text-lg font-semibold mb-2'>Memory</h2>
      <p>Total: {memory.total} MB</p>
      <p>Used: {memory.used} MB</p>
      <div className='w-full bg-gray-200 rounded-full h-3 mt-2'>
        <div className='bg-indigo-600 h-3 rounded-full transition-all' style={{ width: `${memory.usedPercent}%` }} />
      </div>
      <p className='text-sm text-gray-500 mt-1'>{memory.usedPercent}% Used</p>
    </div>
  );
}
