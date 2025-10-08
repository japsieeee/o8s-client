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

  const { emit } = useSocket({ socketType: 'agent' });

  // --- Dynamic height
  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, [agent.metricsHistory, expanded]);

  // --- Latest metrics snapshot
  const latestMetrics = useMemo(() => {
    if (!agent?.metricsHistory?.length) return undefined;
    return agent.metricsHistory[agent.metricsHistory.length - 1];
  }, [agent.metricsHistory]);

  // --- Build PM2 services from metricsHistory
  const pm2Services = useMemo<IPM2Service[]>(() => {
    const liveList = latestMetrics?.pm2Services?.services || [];
    return liveList.map((svc: any) => ({
      name: svc.name,
      status: svc.status,
      isDeploying: false,
      isRestarting: false,
      isStarting: false,
      isStopping: false,
    }));
  }, [latestMetrics]);

  // --- Toggle expand
  const handleToggle = () => setExpanded((prev) => !prev);

  // --- Reboot Agent
  const handleAgentReboot = () => {
    emit(`reboot:${agent.clusterId}:${agent.id}`, '');
  };

  // --- PM2 actions
  const handleServiceAction = (
    serviceName: string,
    action: 'restart' | 'start' | 'stop' | 'deploy' | 'save-config',
  ) => {
    emit('pm2-action', {
      clusterId: agent.clusterId,
      agentId: agent.id,
      action,
      serviceName,
    });
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    setSaveMessage(null);

    emit('pm2-action', {
      configFile: configText, // 💾 Pass actual textarea content
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

  // --- Listen for PM2 action results
  useListenSocketEvent({
    event: `pm2-action-result:${agent.clusterId}:${agent.id}`,
    socketType: 'agent',
    callback: (payload: any) => {
      console.log('PM2 action result:', payload);
    },
  });

  // --- Config editing
  const [configText, setConfigText] = useState('// Loading ecosystem.config.js...');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // 🧠 Load real config text when metrics update
  useEffect(() => {
    const rawConfig = latestMetrics?.pm2Services?.configFile;
    if (rawConfig) {
      try {
        const parsed = JSON.parse(rawConfig); // unescape from backend
        setConfigText(parsed);
      } catch (err) {
        console.warn('⚠️ Failed to parse config file string:', err);
      }
    }
  }, [latestMetrics]);

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
            e.stopPropagation();
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
        <div ref={contentRef} className='space-y-4'>
          {/* --- PM2 Service List --- */}
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
                          : service.status === 'errored'
                          ? 'text-red-500'
                          : 'text-yellow-500 italic'
                      }`}
                    >
                      {service.status === 'online'
                        ? 'Running'
                        : service.status === 'stopped'
                        ? 'Stopped'
                        : service.status === 'errored'
                        ? 'Error'
                        : 'Not Detected'}
                    </span>
                  </div>

                  <div className='flex gap-1.5'>
                    <PM2DefaultButton
                      icon={<ArrowPathIcon className='w-4 h-4' />}
                      label='Restart'
                      onClick={() => handleServiceAction(service.name, 'restart')}
                    />
                    <PM2DefaultButton
                      icon={<PlayIcon className='w-4 h-4' />}
                      label='Start'
                      onClick={() => handleServiceAction(service.name, 'start')}
                    />
                    <PM2DefaultButton
                      icon={<PauseIcon className='w-4 h-4' />}
                      label='Stop'
                      onClick={() => handleServiceAction(service.name, 'stop')}
                    />
                    <PM2DefaultButton
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
              No active PM2 services reported by agent
            </div>
          )}

          {/* --- Config Editor --- */}
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
