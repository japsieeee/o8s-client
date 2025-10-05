'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function StorageChart({ data }: { data: EventMetricsResponse[] }) {
  const latest = data.at(-1);
  const disks = latest?.storage ?? [];

  // Dynamic color based on usage %
  const getColor = (percent: number) => {
    if (percent < 50) return '#10b981'; // green (healthy)
    if (percent < 80) return '#f59e0b'; // amber (moderate)
    return '#ef4444'; // red (critical)
  };

  // Prepare chart data (color based on usedPercent)
  const chartData = disks.map((d) => {
    const percent = parseFloat(d.usedPercent.replace('%', '')) || 0;
    return {
      mount: d.mount,
      usedPercent: percent,
      size: d.size,
      used: d.used,
      avail: d.avail,
      fill: getColor(percent),
    };
  });

  return (
    <div className='bg-white rounded-xl shadow p-4 h-full'>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>
        Storage {latest?.dateTime ? `(${latest.dateTime})` : ''}
      </h3>

      {disks.length === 0 ? (
        <p className='text-gray-400 text-sm italic'>No storage data available</p>
      ) : (
        <div className='h-56'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData} layout='vertical'>
              <XAxis type='number' domain={[0, 100]} hide />
              <YAxis
                dataKey='mount'
                type='category'
                width={100}
                tickFormatter={(mount) => {
                  const disk = chartData.find((d) => d.mount === mount);
                  return disk ? `${disk.mount} (${disk.size})` : mount;
                }}
              />
              <Tooltip
                formatter={(value: number, name, entry: any) => [
                  `${value.toFixed(1)}% used`,
                  `Size: ${entry.payload.size}, Used: ${entry.payload.used}, Free: ${entry.payload.avail}`,
                ]}
                labelFormatter={(label) => `Disk: ${label}`}
              />
              <Legend />
              <Bar dataKey='usedPercent' name='Used %' isAnimationActive={false}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
