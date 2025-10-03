import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { HTMLAttributes } from 'react';

export interface ProcessesTableProps extends HTMLAttributes<HTMLDivElement> {
  processes: EventMetricsResponse['topProcesses'];
}
