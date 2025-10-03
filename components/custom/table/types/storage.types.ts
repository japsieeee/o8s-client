import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { HTMLAttributes } from 'react';

export interface StorageTableProps extends HTMLAttributes<HTMLDivElement> {
  storage: EventMetricsResponse['storage'];
}
