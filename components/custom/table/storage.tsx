'use client';

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { StorageTableProps } from './types/storage.types';

export function StorageTable({ storage, className, ...rest }: StorageTableProps) {
  // Map storage data for chart
  const chartData = storage.map((s) => ({
    name: s.mount,
    usedPercent: parseFloat(s.usedPercent.replace('%', '')),
  }));

  const getColor = (percent: number) => {
    if (percent > 85) return '#ef4444'; // red
    if (percent > 70) return '#facc15'; // yellow
    return '#22c55e'; // green
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 shadow p-4 overflow-x-auto space-y-6 ${className || ''}`}
      {...rest}
    >
      <h2 className='text-lg font-semibold mb-2'>Storage</h2>

      {/* Visualization */}
      <div className='w-full h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData}>
            <XAxis dataKey='name' />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Bar dataKey='usedPercent'>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={getColor(entry.usedPercent)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <table className='min-w-full text-sm border-collapse'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='p-2'>Filesystem</th>
            <th className='p-2'>Size</th>
            <th className='p-2'>Used</th>
            <th className='p-2'>Available</th>
            <th className='p-2'>% Used</th>
            <th className='p-2'>Mount</th>
          </tr>
        </thead>
        <tbody>
          {storage.map((s, i) => {
            const percent = parseFloat(s.usedPercent.replace('%', ''));
            return (
              <tr key={i} className='border-t'>
                <td className='p-2'>{s.filesystem}</td>
                <td className='p-2'>{s.size}</td>
                <td className='p-2'>{s.used}</td>
                <td className='p-2'>{s.avail}</td>
                <td
                  className={`p-2 font-semibold ${
                    percent > 85 ? 'text-red-500' : percent > 70 ? 'text-yellow-500' : 'text-green-500'
                  }`}
                >
                  {s.usedPercent}
                </td>
                <td className='p-2'>{s.mount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
