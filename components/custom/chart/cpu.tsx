'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function CpuChart({ data }: { data: EventMetricsResponse[] }) {
  const chartData = data.map((m) => ({
    dateTime: m.dateTime,
    avgUsage: m.cpu.usagePerCore.reduce((a, b) => a + b, 0) / (m.cpu.usagePerCore.length || 1),
    loadAvg: m.cpu.loadAvg?.[0] ?? 0,
  }));

  const latest = chartData.at(-1);

  // Determine CPU usage color dynamically
  const getUsageColor = (usage: number) => {
    if (usage < 40) return '#10b981'; // green
    if (usage < 75) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const usageColor = latest ? getUsageColor(latest.avgUsage) : '#4f46e5';

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-2 h-full'>
      <h3 className='text-sm font-semibold text-gray-700'>CPU Usage</h3>
      {latest && (
        <p className='text-2xl font-bold' style={{ color: usageColor }}>
          {latest.avgUsage.toFixed(1)}%
        </p>
      )}
      <div className='h-48'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={chartData}>
            <XAxis dataKey='dateTime' tick={{ fontSize: 10 }} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='avgUsage' stroke={usageColor} strokeWidth={2} dot={false} name='Usage %' />
            <Line type='monotone' dataKey='loadAvg' stroke='#a855f7' strokeWidth={1} dot={false} name='Load Avg' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
