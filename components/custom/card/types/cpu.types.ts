import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { HTMLAttributes } from 'react';

export interface CpuCardProps extends HTMLAttributes<HTMLDivElement> {
  cpu: EventMetricsResponse['cpu'];
}
