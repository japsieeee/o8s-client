'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function MemoryChart({ data }: { data: EventMetricsResponse[] }) {
  const chartData = data.map((m) => ({
    dateTime: m.dateTime,
    usedPercent: m.memory.usedPercent,
    used: m.memory.used,
    total: m.memory.total,
  }));

  const latest = chartData.at(-1);

  // Dynamic color based on usage
  const getColor = (percent: number) => {
    if (percent < 50) return '#10b981'; // green
    if (percent < 80) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const strokeColor = latest ? getColor(latest.usedPercent) : '#10b981';

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-2 h-full'>
      <h3 className='text-sm font-semibold text-gray-700'>Memory Usage</h3>
      {latest && (
        <p className='text-2xl font-bold' style={{ color: strokeColor }}>
          {latest.usedPercent.toFixed(1)}%
        </p>
      )}
      <div className='h-48'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={chartData}>
            <XAxis dataKey='dateTime' tick={{ fontSize: 10 }} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Used Memory']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type='monotone'
              dataKey='usedPercent'
              stroke={strokeColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
