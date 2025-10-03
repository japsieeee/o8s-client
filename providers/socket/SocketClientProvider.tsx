'use client';

import LoadingBubbles from '@/components/custom/loader/bubble';
import useInitSocket from '@/hooks/socket/useInitSocket';
import { ISocketClientProvider } from '@/providers/socket/types/provider.types';

export default function SocketClientProvider(prop: ISocketClientProvider) {
  const { state } = useInitSocket('agent');

  if (state === 'loading') return <LoadingBubbles fullscreen />;

  return <>{prop.children}</>;
}
