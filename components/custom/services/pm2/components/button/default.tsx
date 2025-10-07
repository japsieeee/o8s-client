'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PM2DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label?: string;
  loading?: boolean; // 👈 added loading prop
}

export default function PM2DefaultButton({
  icon,
  label,
  loading = false,
  className = '',
  disabled,
  ...rest
}: PM2DefaultButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1 px-2 py-1 text-xs text-gray-600 
        hover:text-gray-900 hover:bg-gray-100 rounded-md 
        border border-transparent hover:border-gray-200 
        transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={loading || disabled} // 👈 disable while loading
      {...rest}
    >
      {loading ? (
        // 🌀 minimal Tailwind spinner
        <span className='w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin' />
      ) : (
        <>
          {icon && <span className='w-4 h-4'>{icon}</span>}
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
