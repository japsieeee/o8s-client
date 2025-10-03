'use client';

import clsx from 'clsx';

type LoadingBubblesProps = {
  fullscreen?: boolean; // optional full overlay mode
  className?: string;
};

export default function LoadingBubbles({ fullscreen = false, className }: LoadingBubblesProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        fullscreen ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm' : 'py-16',
        className,
      )}
    >
      <div className='relative flex h-24 w-40 items-center justify-center'>
        <span className='loading-gradient-bubble size-8 bg-gradient-to-r from-primary to-accent'></span>
        <span className='loading-gradient-bubble size-6 bg-gradient-to-r from-accent to-primary-light'></span>
        <span className='loading-gradient-bubble size-10 bg-gradient-to-r from-primary-dark to-accent-dark'></span>
      </div>
    </div>
  );
}
