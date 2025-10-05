'use client';

import CopyButton from '@/components/custom/button/copy';

export default function DocCard({
  icon,
  title,
  description,
  code,
  list,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  code?: string;
  list?: string[];
  note?: string;
}) {
  return (
    <div className='bg-white rounded-xl shadow p-6 space-y-3'>
      <div className='flex items-center gap-2'>
        {icon}
        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
      </div>

      <p className='text-sm text-gray-600'>{description}</p>

      {list && (
        <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {code && (
        <div className='relative group'>
          <pre className='bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto pr-12'>{code}</pre>
          <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
            <CopyButton text={code} />
          </div>
        </div>
      )}

      {note && <p className='text-sm text-gray-600'>{note}</p>}
    </div>
  );
}
