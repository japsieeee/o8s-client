'use client';

import Page408 from '@/components/custom/fallback/408';
import LoadingBubbles from '@/components/custom/loader/bubble';
import useInitSocket from '@/hooks/socket/useInitSocket';
import { ISocketClientProvider } from '@/providers/socket/types/provider.types';

export default function SocketClientProvider(prop: ISocketClientProvider) {
  const { state } = useInitSocket('agent');

  if (state === 'timeout') return <Page408 />;
  if (state === 'not-ready') return <LoadingBubbles fullscreen />;

  return <>{prop.children}</>;
}
