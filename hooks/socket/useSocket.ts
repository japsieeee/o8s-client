import SocketClass from '@/classes/socket';
import { SocketTypes, UseSocketProps } from '@/hooks/socket/types/use-socket.types';
import { EventMetricsResponse } from './types/event-response.types';

const agentSocket = new SocketClass(process.env.NEXT_PUBLIC_WSS_URL);

export default function useSocket({ socketType }: UseSocketProps) {
  if (socketType === 'agent' && agentSocket) {
    return createSocketHandler(agentSocket, socketType);
  }

  throw new Error('Invalid socket type or socket instance is not available');
}

function createSocketHandler(socket: SocketClass, socketType: SocketTypes) {
  function init(cb?: () => void) {
    socket.getSocketInstance().connect();
    const socketInstance = socket.getSocketInstance();

    if (!socketInstance) {
      console.error('Socket instance is not available');
      return;
    }

    socketInstance.connect();

    socketInstance.on('connect', () => {
      console.log('connected to socket server: ', socketType);

      cb && cb();
    });

    socketInstance.on('disconnect', () => {
      console.log('disconnected from server');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Error detected when attempting to connect to server:', error);
    });
  }

  function listen<T>(event: string, cb: (payload: T) => void) {
    console.log('started listening to ' + event);

    socket.getSocketInstance().on(event, (payload: EventMetricsResponse) => {
      cb(payload as T);
    });
  }

  function emit(event: string, payload: any) {
    socket.getSocketInstance().emit(event, payload);
  }

  function destroy(event: string) {
    socket.getSocketInstance().off(event);
  }

  return {
    init,
    listen,
    emit,
    destroy,
  };
}
