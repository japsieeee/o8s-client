import { SOCKET_CONNECTION_TIME_OUT } from '@/classes/socket/constants';
import { useEffect, useState } from 'react';
import { SocketState } from './types/use-init-socket.types';
import { SocketTypes } from './types/use-socket.types';
import useSocket from './useSocket';

export default function useInitSocket(socketType: SocketTypes) {
  const [state, setState] = useState<SocketState>('not-ready');

  const { init } = useSocket({
    socketType,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      setState((prev) => (prev === 'not-ready' ? 'timeout' : prev));
    }, SOCKET_CONNECTION_TIME_OUT);

    init(() => {
      clearTimeout(timeoutId);
      setState('ready');
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [init]);

  return { state };
}
