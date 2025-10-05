'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';

export default function ProcessesChart({ data }: { data: EventMetricsResponse[] }) {
  const latest = data.at(-1);
  const processes = latest?.topProcesses ?? [];

  return (
    <div className='bg-white rounded-xl shadow p-4 h-full'>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>Top Processes ({latest?.dateTime})</h3>
      {processes.length === 0 ? (
        <p className='text-gray-400 text-sm italic'>No data available</p>
      ) : (
        <table className='w-full text-xs'>
          <thead>
            <tr className='text-left text-gray-500 border-b'>
              <th className='py-1'>PID</th>
              <th className='py-1'>Command</th>
              <th className='py-1 text-right'>Mem%</th>
            </tr>
          </thead>
          <tbody>
            {processes.slice(0, 5).map((p) => (
              <tr key={p.pid} className='border-b last:border-0'>
                <td className='py-1'>{p.pid}</td>
                <td className='py-1 truncate max-w-[140px]'>{p.command}</td>
                <td className='py-1 text-right'>{p.memPercent.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
