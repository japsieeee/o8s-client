'use client';

import useListenSocketEvent from '@/hooks/socket/useListenSocketEvent';
import useSocket from '@/hooks/socket/useSocket';
import { Agent } from '@/stores/agent';
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  PauseIcon,
  PlayIcon,
  PowerIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PM2DefaultButton from './components/button/default';
import { IPM2Service } from './types';

interface PM2ServiceProps {
  agent: Agent;
}

const ACTION_FLAGS = {
  deploy: 'isDeploying',
  restart: 'isRestarting',
  start: 'isStarting',
  stop: 'isStopping',
} as const;

const STATUS_MAP: Record<keyof typeof ACTION_FLAGS, string> = {
  deploy: 'online',
  restart: 'online',
  start: 'online',
  stop: 'stopped',
};

export default function PM2Service({ agent }: PM2ServiceProps) {
  const { emit } = useSocket({ socketType: 'agent' });
  const [expanded, setExpanded] = useState(false);
  const [serviceStates, setServiceStates] = useState<Record<string, Partial<IPM2Service>>>({});
  const [configText, setConfigText] = useState('// Loading ecosystem.config.js...');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const latestMetrics = useMemo(() => agent?.metricsHistory?.at(-1), [agent.metricsHistory]);
  const liveServices = latestMetrics?.pm2Services?.services ?? [];

  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, [agent.metricsHistory, expanded]);

  const pm2Services = useMemo<IPM2Service[]>(
    () =>
      liveServices.map((svc) => ({
        ...svc,
        ...serviceStates[svc.name],
      })) as IPM2Service[],
    [liveServices, serviceStates],
  );

  const handleServiceAction = (serviceName: string, action: keyof typeof ACTION_FLAGS) => {
    const flag = ACTION_FLAGS[action];
    setServiceStates((prev) => ({
      ...prev,
      [serviceName]: { ...prev[serviceName], [flag]: true },
    }));

    emit('pm2-action', { clusterId: agent.clusterId, agentId: agent.id, action, serviceName });
  };

  const handleAgentReboot = (e: React.MouseEvent) => {
    e.stopPropagation();
    emit(`reboot:${agent.clusterId}:${agent.id}`, '');
  };

  const handleToggle = () => setExpanded((prev) => !prev);

  useListenSocketEvent({
    event: `pm2-action-result:${agent.clusterId}:${agent.id}`,
    socketType: 'agent',
    callback: useCallback((payload: any) => {
      const { serviceName, action } = payload;
      const flag = ACTION_FLAGS[action as keyof typeof ACTION_FLAGS];
      const updatedStatus = STATUS_MAP[action as keyof typeof ACTION_FLAGS] || '';

      setServiceStates((prev) => ({
        ...prev,
        [serviceName]: {
          ...prev[serviceName],
          [flag]: false,
          status: updatedStatus,
        },
      }));
    }, []),
  });

  useEffect(() => {
    const raw = latestMetrics?.pm2Services?.configFile;
    if (raw) {
      try {
        setConfigText(JSON.parse(raw));
      } catch {
        console.warn('⚠️ Failed to parse config file');
      }
    }
  }, [latestMetrics]);

  const handleSaveConfig = () => {
    setIsSaving(true);
    setSaveMessage(null);

    emit('pm2-action', {
      configFile: configText,
      clusterId: agent.clusterId,
      agentId: agent.id,
      action: 'save-config',
      serviceName: '',
    });

    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('✅ Config sent to backend');
      setTimeout(() => setSaveMessage(null), 3000);
    }, 1500);
  };

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
          onClick={handleAgentReboot}
          className='flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition'
        >
          <PowerIcon className='w-4 h-4' /> Reboot Agent
        </button>
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'opacity-100 mt-2' : 'opacity-0'
        }`}
        style={{ maxHeight: expanded ? `${contentHeight ?? 0}px` : '0px' }}
      >
        <div ref={contentRef} className='space-y-4'>
          {/* PM2 Service List */}
          {pm2Services.length ? (
            <div className='space-y-2'>
              {pm2Services.map((svc) => {
                const { name, status, isDeploying, isRestarting, isStarting, isStopping } = svc;

                const renderStatus =
                  status === 'online'
                    ? 'Running'
                    : status === 'stopped'
                    ? 'Stopped'
                    : status === 'errored'
                    ? 'Error'
                    : 'Not Detected';

                const statusColor =
                  status === 'online'
                    ? 'text-green-600'
                    : status === 'stopped'
                    ? 'text-gray-500 italic'
                    : status === 'errored'
                    ? 'text-red-500'
                    : 'text-yellow-500 italic';

                return (
                  <div
                    key={name}
                    className='flex items-center justify-between px-4 py-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition'
                  >
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-800'>{name}</span>
                      <span className={`text-xs transition-colors ${statusColor}`}>{renderStatus}</span>
                    </div>

                    <div className='flex gap-1.5'>
                      <PM2DefaultButton
                        icon={
                          isRestarting ? (
                            <ArrowPathIcon className='w-4 h-4 animate-spin text-gray-400' />
                          ) : (
                            <ArrowPathIcon className='w-4 h-4' />
                          )
                        }
                        label={isRestarting ? 'Restarting...' : 'Restart'}
                        disabled={isRestarting}
                        onClick={() => handleServiceAction(name, 'restart')}
                      />

                      <PM2DefaultButton
                        icon={
                          isStarting ? (
                            <ArrowPathIcon className='w-4 h-4 animate-spin text-gray-400' />
                          ) : (
                            <PlayIcon className='w-4 h-4' />
                          )
                        }
                        label={isStarting ? 'Starting...' : 'Start'}
                        disabled={isStarting}
                        onClick={() => handleServiceAction(name, 'start')}
                      />

                      <PM2DefaultButton
                        icon={
                          isStopping ? (
                            <ArrowPathIcon className='w-4 h-4 animate-spin text-gray-400' />
                          ) : (
                            <PauseIcon className='w-4 h-4' />
                          )
                        }
                        label={isStopping ? 'Stopping...' : 'Stop'}
                        disabled={isStopping}
                        onClick={() => handleServiceAction(name, 'stop')}
                      />

                      <PM2DefaultButton
                        icon={
                          isDeploying ? (
                            <ArrowPathIcon className='w-4 h-4 animate-spin text-gray-400' />
                          ) : (
                            <RocketLaunchIcon className='w-4 h-4' />
                          )
                        }
                        label={isDeploying ? 'Deploying...' : 'Deploy'}
                        disabled={isDeploying}
                        onClick={() => handleServiceAction(name, 'deploy')}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='px-4 py-3 text-xs text-gray-400 text-center border border-dashed border-gray-200 rounded-md'>
              No active PM2 services reported by agent
            </div>
          )}

          {/* Config Editor */}
          <motion.div
            className='border border-gray-200 rounded-lg overflow-hidden'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='bg-gray-50 px-3 py-2 flex items-center justify-between text-xs font-medium text-gray-600'>
              <span>Edit ecosystem.config.js</span>
              <button
                disabled={isSaving}
                onClick={handleSaveConfig}
                className='flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition disabled:opacity-50'
              >
                <CloudArrowUpIcon className='w-4 h-4' />
                {isSaving ? 'Saving...' : 'Save Config'}
              </button>
            </div>

            <textarea
              className='w-full font-mono text-xs bg-white p-3 border-t border-gray-100 outline-none resize-none min-h-[200px]'
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              spellCheck={false}
            />

            {saveMessage && (
              <div className='text-[11px] text-center text-green-600 py-1 border-t border-gray-100 bg-gray-50'>
                {saveMessage}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
