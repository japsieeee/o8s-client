'use client';

export default function PM2ActionButton({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <button
      className={`flex items-center gap-1.5 text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-all ${color}`}
    >
      {icon}
      <span className='hidden sm:inline'>{label}</span>
    </button>
  );
}
