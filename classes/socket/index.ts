import { SocketOptions } from 'dgram';
import { io, ManagerOptions, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { SOCKET_CONNECTION_TIME_OUT } from './constants';

export default class SocketClass {
  private socket: Socket;

  constructor(wss: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    const browserClientId = uuidv4();

    this.socket = io(wss, {
      autoConnect: false,
      timeout: SOCKET_CONNECTION_TIME_OUT,
      auth: {
        browserClientId,
        wsToken: process.env.NEXT_PUBLIC_WS_TOKEN || '',
      },
      transports: ['websocket'],
      ...opts,
    });
  }

  public getSocketInstance() {
    return this.socket;
  }
}
