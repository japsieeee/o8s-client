import { useEffect } from 'react';
import { UseListenSocketEventProps } from './types/use-listen-socket-event.types';
import useSocket from './useSocket';

export default function useListenSocketEvent<T>({ preRun, event, socketType, callback }: UseListenSocketEventProps<T>) {
  const { listen, destroy } = useSocket({
    socketType,
  });

  useEffect(() => {
    if (preRun) {
      const result = preRun();
      if (result instanceof Promise) {
        result.then(() => {
          listen(event, callback);
        });
      } else {
        listen(event, callback);
      }
      return;
    } else {
      listen(event, callback);
    }

    return () => {
      destroy(event);
    };
  }, [event]);
}
