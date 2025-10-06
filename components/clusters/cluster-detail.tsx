'use client';

import AgentCard from '@/components/custom/card/agent-card';
import useCopy from '@/hooks/utils/useCopy';
import { useAgentStore } from '@/stores/agent';
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { VisibleMetrics } from './types/cluster-types';

export default function ClusterDetail({ clusterId, clusterName }: { clusterId: string; clusterName: string }) {
  const { copiedId, handleCopy } = useCopy();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState<VisibleMetrics>({
    cpu: true,
    memory: true,
    network: true,
    storage: true,
    processes: true,
  });

  const { agents, addAgent } = useAgentStore();
  const handleCreateAgent = () => addAgent(clusterId);
  const toggleMetricVisibility = (metric: keyof typeof visibleMetrics) =>
    setVisibleMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));

  // Mock PM2 services
  const pm2Services = [
    { name: 'api-server', status: 'running' },
    { name: 'websocket', status: 'stopped' },
    { name: 'scheduler', status: 'running' },
  ];

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 font-sans'>
      {/* Header */}
      <header className='max-w-5xl mx-auto px-6 py-10 border-b border-gray-200'>
        <Link href='/clusters' className='inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800'>
          <ArrowLeftIcon className='w-4 h-4' />
          Back to Clusters
        </Link>

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
        <p className='text-sm text-gray-500 mt-2'>Manage and monitor your agents for this cluster.</p>
      </header>

      {/* Main */}
      <main className='max-w-5xl mx-auto px-6 py-8 space-y-8'>
        {/* Controls */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <button
            onClick={handleCreateAgent}
            className='flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all'
          >
            <PlusIcon className='w-5 h-5' />
            Add Agent
          </button>

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
          </div>
        </div>

        {/* Agent Cards */}
        {agents.length === 0 ? (
          <p className='mt-10 text-gray-400 italic text-center'>No matching agents found.</p>
        ) : (
          <div className='grid grid-cols-1 gap-6'>
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} visibleMetrics={visibleMetrics} pm2Services={pm2Services} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
