'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import useListenSocketEvent from '@/hooks/socket/useListenSocketEvent';
import useCopy from '@/hooks/utils/useCopy';
import { Agent, useAgentStore } from '@/stores/agent';
import { CheckIcon, ClipboardIcon, PencilIcon } from '@heroicons/react/24/outline';
import CpuChart from '../custom/chart/cpu';
import MemoryChart from '../custom/chart/memory';
import NetworkChart from '../custom/chart/network';
import ProcessesChart from '../custom/chart/processes';
import StorageChart from '../custom/chart/storage';
import { VisibleMetrics } from './types/cluster-types';

export default function AgentOverview({ agent, visibleMetrics }: { agent: Agent; visibleMetrics: VisibleMetrics }) {
  const { copiedId, handleCopy } = useCopy();
  const { updateAgent, removeAgent, addMetrics } = useAgentStore();

  useListenSocketEvent({
    event: `metrics:${agent.clusterId}:${agent.id}`,
    callback: (data: EventMetricsResponse) => {
      console.log('data: ', data);

      addMetrics(agent.id, data);
    },
    socketType: 'agent',
  });

  const handleEditToggle = (id: string) => {
    if (agent) updateAgent(id, { editing: !agent.editing });
  };

  const handleNameChange = (id: string, newName: string) => {
    updateAgent(id, { name: newName });
  };

  return (
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
            <button onClick={() => handleEditToggle(agent.id)} className='p-1 text-green-600 hover:text-green-700'>
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
  );
}
