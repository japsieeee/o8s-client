'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import useListenSocketEvent from '@/hooks/socket/useListenSocketEvent';
import useSocket from '@/hooks/socket/useSocket';
import useCopy from '@/hooks/utils/useCopy';
import { useAgentStore } from '@/stores/agent';
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

// charts
import CpuChart from '@/components/custom/chart/cpu';
import MemoryChart from '@/components/custom/chart/memory';
import NetworkChart from '@/components/custom/chart/network';
import ProcessesChart from '@/components/custom/chart/processes';
import StorageChart from '@/components/custom/chart/storage';

export default function ClusterDetail({ clusterId, clusterName }: { clusterId: string; clusterName: string }) {
  const { copiedId, handleCopy } = useCopy();
  const [searchQuery, setSearchQuery] = useState('');

  const [visibleMetrics, setVisibleMetrics] = useState({
    cpu: true,
    memory: true,
    network: true,
    storage: true,
    processes: true,
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const { agents: allAgents, addAgent, updateAgent, removeAgent, addMetrics } = useAgentStore();

  const agents = allAgents.filter((c) => c.clusterId === clusterId);

  const { emit } = useSocket({
    socketType: 'agent',
  });

  useListenSocketEvent({
    preRun: () => {
      emit('handle-join', { clusterId });
    },
    event: 'metrics',
    callback: (data: EventMetricsResponse) => {
      agents.forEach((agent) => {
        addMetrics(agent.id, data);
      });
    },
    socketType: 'agent',
  });

  const handleCreateAgent = () => {
    addAgent(clusterId);
  };

  const handleEditToggle = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (agent) updateAgent(id, { editing: !agent.editing });
  };

  const handleNameChange = (id: string, newName: string) => {
    updateAgent(id, { name: newName });
  };

  const toggleMetricVisibility = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));
  };

  // filter
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 font-sans'>
      <header className='max-w-5xl mx-auto px-6 py-8 space-y-4'>
        <Link href='/clusters' className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800'>
          <ArrowLeftIcon className='w-4 h-4' />
          Back to Clusters
        </Link>
        <div>
          <h1 className='text-2xl font-bold flex items-center gap-2'>
            <ServerIcon className='w-6 h-6 text-indigo-600' />
            Cluster: {clusterName}
            <span className='text-gray-500'>({clusterId.slice(0, 6)}...)</span>
            <button
              onClick={() => handleCopy(clusterId)}
              className='ml-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700'
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
          </h1>
          <p className='text-gray-600 mt-1'>Manage and monitor agents inside this cluster.</p>
        </div>
      </header>

      <main className='max-w-5xl mx-auto px-6 space-y-6'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
          <button
            onClick={handleCreateAgent}
            className='flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors'
          >
            <PlusIcon className='w-5 h-5' />
            Add Agent
          </button>

          <div className='flex items-center gap-3 w-full sm:w-auto'>
            {/* Search bar */}
            <div className='relative w-full sm:w-64'>
              <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input
                type='text'
                placeholder='Search by name or ID...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>

            {/* Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className='flex items-center gap-1 px-3 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100'
              >
                Metrics <ChevronDownIcon className='w-4 h-4' />
              </button>

              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10 p-2'>
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

        {filteredAgents.length === 0 ? (
          <p className='mt-8 text-gray-500 italic'>No matching agents.</p>
        ) : (
          <div className='grid grid-cols-1 gap-6'>
            {filteredAgents.map((agent) => (
              <div key={agent.id} className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6'>
                <div className='flex items-center justify-between mb-4'>
                  {agent.editing ? (
                    <div className='flex items-center gap-2 w-full'>
                      <input
                        value={agent.name}
                        onChange={(e) => handleNameChange(agent.id, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEditToggle(agent.id)}
                        className='border rounded px-2 py-1 flex-grow text-sm'
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditToggle(agent.id)}
                        className='p-1 text-green-600 hover:text-green-700'
                      >
                        <CheckIcon className='w-4 h-4' />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className='font-semibold text-lg'>{agent.name}</h2>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-400'>{agent.id.slice(0, 6)}</span>
                        <button
                          onClick={() => handleCopy(agent.id)}
                          className='p-1 text-gray-500 hover:text-gray-700'
                          aria-label='Copy Agent ID'
                        >
                          {copiedId === agent.id ? (
                            <CheckIcon className='w-4 h-4 text-green-500' />
                          ) : (
                            <ClipboardIcon className='w-4 h-4' />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditToggle(agent.id)}
                          className='p-1 text-gray-500 hover:text-gray-700'
                          aria-label='Edit Agent Name'
                        >
                          <PencilIcon className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove agent "${agent.name}"?`)) {
                              removeAgent(agent.id);
                            }
                          }}
                          className='p-1 text-red-500 hover:text-red-700'
                          aria-label='Remove Agent'
                        >
                          ✕
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {agent.metricsHistory && agent.metricsHistory.length > 0 ? (
                  <div className='grid grid-cols-12 gap-4 w-full'>
                    {visibleMetrics.cpu && (
                      <div className='col-span-4'>
                        <CpuChart data={agent.metricsHistory} />
                      </div>
                    )}
                    {visibleMetrics.processes && (
                      <div className='col-span-4'>
                        <ProcessesChart data={agent.metricsHistory} />
                      </div>
                    )}
                    {visibleMetrics.network && (
                      <div className='col-span-4'>
                        <NetworkChart data={agent.metricsHistory} />
                      </div>
                    )}
                    {visibleMetrics.storage && (
                      <div className='col-span-4'>
                        <StorageChart data={agent.metricsHistory} />
                      </div>
                    )}
                    {visibleMetrics.memory && (
                      <div className='col-span-4'>
                        <MemoryChart data={agent.metricsHistory} />
                      </div>
                    )}
                  </div>
                ) : (
                  <p className='text-gray-400 italic'>Waiting for metrics...</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
