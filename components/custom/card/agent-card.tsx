'use client';

import AgentOverview from '@/components/clusters/agent-overview';
import { VisibleMetrics } from '@/components/clusters/types/cluster-types';
import { Agent } from '@/stores/agent';
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  PowerIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import PM2ActionButton from '../button/pm2-action';

export default function AgentCard({
  agent,
  visibleMetrics,
  pm2Services,
}: {
  agent: Agent;
  visibleMetrics: VisibleMetrics;
  pm2Services: { name: string; status: string }[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='font-semibold text-lg text-gray-800'>{agent.name}</h2>
        <span className='text-xs text-gray-400'>{agent.id.slice(0, 8)}</span>
      </div>

      <AgentOverview agent={agent} visibleMetrics={visibleMetrics} />

      <div className='border-t border-gray-100 my-5' />

      {/* Toggle header */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className='flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition'
      >
        <span className='flex items-center gap-2'>
          {expanded ? <ChevronDownIcon className='w-4 h-4' /> : <ChevronRightIcon className='w-4 h-4' />}
          PM2 Services
        </span>
        <button className='text-xs flex items-center gap-1 text-red-500 hover:text-red-600'>
          <PowerIcon className='w-4 h-4' /> Reboot Agent
        </button>
      </button>

      {/* Collapsible content */}
      {expanded && (
        <div className='mt-3 space-y-2'>
          {pm2Services.map((service) => (
            <div
              key={service.name}
              className='flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition'
            >
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-gray-800'>{service.name}</span>
                <span
                  className={`text-xs ${
                    service.status === 'running'
                      ? 'text-green-500'
                      : service.status === 'stopped'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {service.status === 'running' ? '🟢 Running' : '🔴 Stopped'}
                </span>
              </div>

              <div className='flex gap-2'>
                <PM2ActionButton icon={<ArrowPathIcon className='w-4 h-4' />} label='Restart' color='text-blue-500' />
                <PM2ActionButton icon={<PlayIcon className='w-4 h-4' />} label='Start' color='text-green-500' />
                <PM2ActionButton icon={<PauseIcon className='w-4 h-4' />} label='Stop' color='text-yellow-500' />
                <PM2ActionButton
                  icon={<RocketLaunchIcon className='w-4 h-4' />}
                  label='Deploy'
                  color='text-indigo-500'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
