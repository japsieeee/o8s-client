'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useState } from 'react';
import { IVisibleMetrics } from '../types';

interface IMetricsDropdown {
  visibleMetrics: IVisibleMetrics;
  setVisibleMetrics: Dispatch<SetStateAction<IVisibleMetrics>>;
}

export default function MetricsDropdown({ visibleMetrics, setVisibleMetrics }: IMetricsDropdown) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMetricVisibility = (metric: keyof typeof visibleMetrics) =>
    setVisibleMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));

  return (
    <div className='relative'>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className='flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-100'
      >
        Metrics
        <ChevronDownIcon className='w-4 h-4' />
      </button>

      {showDropdown && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10 p-2'>
          {Object.keys(visibleMetrics).map((metricKey) => (
            <label
              key={metricKey}
              className='flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-50 rounded'
            >
              <input
                type='checkbox'
                checked={visibleMetrics[metricKey as keyof typeof visibleMetrics]}
                onChange={() => toggleMetricVisibility(metricKey as keyof typeof visibleMetrics)}
              />
              <span className='capitalize'>{metricKey}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
