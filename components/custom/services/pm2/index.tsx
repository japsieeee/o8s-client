'use client';

import useListenSocketEvent from '@/hooks/socket/useListenSocketEvent';
import useSocket from '@/hooks/socket/useSocket';
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
import { useEffect, useMemo, useRef, useState } from 'react';
import PM2DefaultButton from './components/button/default';
import { IPM2Service } from './types';

interface PM2ServiceProps {
  agent: Agent;
}

export default function PM2Service({ agent }: PM2ServiceProps) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Dynamically measure height for smooth expand/collapse animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [agent.metricsHistory, expanded]);

  // 🧠 Use the *latest* metrics snapshot (usually the last one)
  const latestMetrics = useMemo(() => {
    if (!agent?.metricsHistory?.length) return undefined;
    return agent.metricsHistory[agent.metricsHistory.length - 1];
  }, [agent.metricsHistory]);

  // 🧩 Extract pm2 services if available
  const pm2Metrics: IPM2Service[] =
    (latestMetrics?.pm2Services || []).map((v) => ({
      ...v,
      isDeploying: false,
      isRestarting: false,
      isStarting: false,
      isStopping: false,
    })) || [];
  const [pm2Services, setPm2Services] = useState<IPM2Service[]>(pm2Metrics);

  const handleToggle = () => setExpanded((prev) => !prev);

  const handleAgentReboot = () => {
    const rebootEvent = `reboot:${agent.clusterId}:${agent.id}`;
    emit(rebootEvent, '');
  };

  const { emit } = useSocket({
    socketType: 'agent',
  });

  const handleServiceAction = (serviceName: string, action: 'restart' | 'start' | 'stop' | 'deploy') => {
    setPm2Services((prev) => {
      return prev.map((v) => {
        if (v.name === serviceName && action === 'start') {
          return { ...v, isStarting: true };
        }

        if (v.name === serviceName && action === 'restart') {
          return { ...v, isRestarting: true };
        }

        if (v.name === serviceName && action === 'stop') {
          return { ...v, isStopping: true };
        }

        if (v.name === serviceName && action === 'deploy') {
          return { ...v, isDeploying: true };
        }

        return v;
      });
    });

    emit('pm2-action', {
      clusterId: agent.clusterId,
      agentId: agent.id,
      action,
      serviceName,
    });
  };

  const pm2ActionResultEvent = `pm2-action-result:${agent.clusterId}:${agent.id}`;
  useListenSocketEvent({
    event: pm2ActionResultEvent,
    socketType: 'agent',
    callback: (payload: any) => {
      setPm2Services((prev) => {
        return prev.map((v) => {
          if (v.name === payload.serviceName && payload.action === 'start') {
            return { ...v, isStarting: false, status: 'online' };
          }

          if (v.name === payload.serviceName && payload.action === 'restart') {
            return { ...v, isRestarting: false, status: 'online' };
          }

          if (v.name === payload.serviceName && payload.action === 'stop') {
            return { ...v, isStopping: false, status: 'stopped' };
          }

          if (v.name === payload.serviceName && payload.action === 'deploy') {
            return { ...v, isDeploying: false, status: 'online' };
          }

          return v;
        });
      });
    },
  });

  return (
    <div className='w-full'>
      {/* Header */}
      <div
        onClick={handleToggle}
        className='flex items-center justify-between w-full cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition'
      >
        <span className='flex items-center gap-2 font-medium'>
          {expanded ? <ChevronDownIcon className='w-4 h-4' /> : <ChevronRightIcon className='w-4 h-4' />}
          PM2 Services
        </span>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation(); // avoid collapsing when clicking this
            handleAgentReboot();
          }}
          className='flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition'
        >
          <PowerIcon className='w-4 h-4' /> Reboot Agent
        </button>
      </div>

      {/* Collapsible Section */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'opacity-100 mt-2' : 'opacity-0'
        }`}
        style={{
          maxHeight: expanded ? `${contentHeight ?? 0}px` : '0px',
        }}
      >
        <div ref={contentRef}>
          {pm2Services.length > 0 ? (
            <div className='space-y-2'>
              {pm2Services.map((service) => (
                <div
                  key={service.name}
                  className='flex items-center justify-between px-4 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition'
                >
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium text-gray-800'>{service.name}</span>
                    <span
                      className={`text-xs ${
                        service.status === 'online'
                          ? 'text-green-600'
                          : service.status === 'stopped'
                          ? 'text-gray-500 italic'
                          : 'text-red-500'
                      }`}
                    >
                      {service.status === 'online' ? 'Running' : service.status === 'stopped' ? 'Stopped' : 'Error'}
                    </span>
                  </div>

                  <div className='flex gap-1.5'>
                    <PM2DefaultButton
                      loading={service.isRestarting}
                      icon={<ArrowPathIcon className='w-4 h-4' />}
                      label='Restart'
                      onClick={() => handleServiceAction(service.name, 'restart')}
                    />
                    <PM2DefaultButton
                      loading={service.isStarting}
                      icon={<PlayIcon className='w-4 h-4' />}
                      label='Start'
                      onClick={() => handleServiceAction(service.name, 'start')}
                    />
                    <PM2DefaultButton
                      loading={service.isStopping}
                      icon={<PauseIcon className='w-4 h-4' />}
                      label='Stop'
                      onClick={() => handleServiceAction(service.name, 'stop')}
                    />
                    <PM2DefaultButton
                      disabled
                      loading={service.isDeploying}
                      icon={<RocketLaunchIcon className='w-4 h-4' />}
                      label='Deploy'
                      onClick={() => handleServiceAction(service.name, 'deploy')}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='px-4 py-3 text-xs text-gray-400 text-center border border-dashed border-gray-200 rounded-md'>
              No PM2 services detected on this agent
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
