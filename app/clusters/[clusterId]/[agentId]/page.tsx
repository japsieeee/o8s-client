import AgentDetail from '@/components/clusters/agent-detail';

interface Props {
  params: { clusterId: string; agentId: string };
}

export default function AgentPage({ params }: Props) {
  return <AgentDetail clusterId={params.clusterId} agentId={params.agentId} />;
}
