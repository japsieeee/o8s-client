import { SocketTypes } from './use-socket.types';

export type UseListenSocketEventProps<T> = {
  preRun?: () => Promise<void> | void;
  event: string;
  socketType: SocketTypes;
  callback: (payload: T) => void;
};
