'use client';

import PM2Service from '@/components/custom/services/pm2';
import { useAgentStore } from '@/stores/agent';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // ✅ minimalist icon
import { useRouter } from 'next/navigation'; // ✅ navigation hook
import { useMemo, useState } from 'react';
import AgentOverview from '../agent/overview';
import ClusterControl from './components/cluster-control';
import { IVisibleMetrics } from './types';

interface IMainClusterDetail {
  clusterId: string;
  clusterName: string;
}

export default function MainClusterDetail({ clusterId, clusterName }: IMainClusterDetail) {
  const router = useRouter();
  const { agents } = useAgentStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [visibleMetrics, setVisibleMetrics] = useState<IVisibleMetrics>({
    cpu: true,
    memory: true,
    network: true,
    storage: true,
    processes: true,
  });

  const filteredAgents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return agents;
    return agents.filter(
      (agent) =>
        agent.name?.toLowerCase().includes(query) ||
        (agent.id?.toLowerCase().includes(query) && agent.clusterId === clusterId),
    );
  }, [agents, searchQuery, clusterId]);

  return (
    <main className='max-w-5xl mx-auto px-6 py-8 space-y-8'>
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.push('/clusters')}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all text-sm group'
      >
        <ArrowLeftIcon className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform' />
        <span>Back to Clusters</span>
      </button>

      <ClusterControl
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clusterId={clusterId}
        clusterName={clusterName}
        visibleMetrics={visibleMetrics}
        setVisibleMetrics={setVisibleMetrics}
      />

      {filteredAgents.length === 0 ? (
        <p className='mt-10 text-gray-400 italic text-center'>No matching agents found.</p>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all'
            >
              <AgentOverview agent={agent} visibleMetrics={visibleMetrics} />

              <div className='border-t border-gray-100 my-5' />

              <PM2Service agent={agent} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
