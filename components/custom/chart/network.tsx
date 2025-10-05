'use client';

import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function NetworkChart({ data }: { data: EventMetricsResponse[] }) {
  const chartData = data.map((m) => ({
    dateTime: m.dateTime,
    rxBytes: m.network.reduce((a, n) => a + n.rxBytes, 0),
    txBytes: m.network.reduce((a, n) => a + n.txBytes, 0),
  }));

  const latest = chartData.at(-1);

  return (
    <div className='bg-white rounded-xl shadow p-4 h-full'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-semibold text-gray-700'>Network Throughput</h3>
        {latest && <p className='text-xs text-gray-500'>Last update: {latest.dateTime}</p>}
      </div>

      <div className='h-56'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={chartData}>
            <XAxis dataKey='dateTime' tick={{ fontSize: 10 }} />
            <YAxis hide />
            <Tooltip
              formatter={(value: number) => [
                `${(value / 1024 / 1024).toFixed(2)} MB/s`,
                value === latest?.rxBytes ? 'RX' : 'TX',
              ]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend />
            {/* RX: Download */}
            <Area
              type='monotone'
              dataKey='rxBytes'
              stroke='#3b82f6' // blue
              fill='#3b82f6'
              fillOpacity={0.25}
              name='Received (RX)'
            />
            {/* TX: Upload */}
            <Area
              type='monotone'
              dataKey='txBytes'
              stroke='#f59e0b' // amber
              fill='#f59e0b'
              fillOpacity={0.25}
              name='Transmitted (TX)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
