'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import { IVisibleMetrics } from '../types';
import CreateAgentButton from './create-agent';
import MetricsDropdown from './metrics-dropdown';

interface IClusterControl {
  clusterId: string;
  clusterName: string;

  visibleMetrics: IVisibleMetrics;
  setVisibleMetrics: Dispatch<SetStateAction<IVisibleMetrics>>;

  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export default function ClusterControl({
  searchQuery,
  setSearchQuery,
  clusterId,
  setVisibleMetrics,
  visibleMetrics,
}: IClusterControl) {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
      <CreateAgentButton clusterId={clusterId} />

      <div className='flex items-center gap-3 w-full sm:w-auto'>
        <div className='relative w-full sm:w-64'>
          <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
          <input
            type='text'
            placeholder='Search by name or ID...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white'
          />
        </div>

        {/* Metrics Dropdown */}
        <MetricsDropdown setVisibleMetrics={setVisibleMetrics} visibleMetrics={visibleMetrics} />
      </div>
    </div>
  );
}
