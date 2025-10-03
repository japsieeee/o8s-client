import { useEffect, useState } from 'react';
import { SocketState } from './types/use-init-socket.types';
import { SocketTypes } from './types/use-socket.types';
import useSocket from './useSocket';

export default function useInitSocket(socketType: SocketTypes) {
  const [state, setState] = useState<SocketState>('loading');

  const { init } = useSocket({
    socketType,
  });

  useEffect(() => {
    init(() => {
      setState('ready');
    });
  }, []);

  return { state };
}
