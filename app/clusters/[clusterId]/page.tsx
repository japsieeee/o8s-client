import MainNavbar from '@/components/nav/main';
import MainClusterDetail from '@/features/clusters/main-cluster-detail';

interface Props {
  params: Promise<{ clusterId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ClusterPage({ params, searchParams }: Props) {
  const { clusterId } = await params;
  const sp = await searchParams;

  const clusterName = typeof sp.clusterName === 'string' ? sp.clusterName : `Cluster-${clusterId.slice(0, 6)}`;

  return (
    <>
      <MainNavbar />
      <MainClusterDetail clusterId={clusterId} clusterName={clusterName} />
    </>
  );
}
