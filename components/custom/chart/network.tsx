'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NetworkChartProps } from './types/network.types';

export default function NetworkChart({ network }: NetworkChartProps) {
  return (
    <div className='rounded-2xl border border-gray-200 shadow p-4'>
      <h2 className='text-lg font-semibold mb-2'>Network</h2>
      <div className='h-56'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={network.map((n) => ({
              iface: n.iface,
              rx: n.rxBytes,
              tx: n.txBytes,
            }))}
          >
            <XAxis dataKey='iface' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='rx' stroke='#22c55e' />
            <Line type='monotone' dataKey='tx' stroke='#ef4444' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
