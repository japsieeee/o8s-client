import AgentDetail from '@/features/agent/detail';

interface Props {
  params: { clusterId: string; agentId: string };
}

export default function AgentPage({ params }: Props) {
  return <AgentDetail />;
}
