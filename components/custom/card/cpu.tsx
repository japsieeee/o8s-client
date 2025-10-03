'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CpuCardProps } from './types/cpu.types';

export default function CpuCard({ cpu }: CpuCardProps) {
  return (
    <div className='rounded-2xl border border-gray-200 shadow p-4'>
      <h2 className='text-lg font-semibold mb-2'>CPU Usage</h2>
      <div className='h-56'>
        <ResponsiveContainer>
          <BarChart data={cpu.usagePerCore.map((u, i) => ({ core: `Core ${i}`, usage: u }))}>
            <XAxis dataKey='core' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='usage' fill='#4f46e5' radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
