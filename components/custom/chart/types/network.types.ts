import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';

export interface NetworkChartProps {
  network: EventMetricsResponse['network'];
}
