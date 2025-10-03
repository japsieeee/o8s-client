'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';

interface Props {
  processes: EventMetricsResponse['topProcesses'];
}

export default function ProcessesTable({ processes }: Props) {
  return (
    <div className='rounded-2xl border border-gray-200 shadow p-4'>
      <h2 className='text-lg font-semibold mb-2'>Top Processes</h2>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='p-2'>PID</th>
            <th className='p-2'>Command</th>
            <th className='p-2'>Mem %</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((proc, i) => (
            <tr key={i} className='border-t'>
              <td className='p-2'>{proc.pid}</td>
              <td className='p-2'>{proc.command}</td>
              <td className='p-2'>{proc.memPercent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
