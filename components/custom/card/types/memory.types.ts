import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { HTMLAttributes } from 'react';

export interface MemoryCardProps extends HTMLAttributes<HTMLDivElement> {
  memory: EventMetricsResponse['memory'];
}
