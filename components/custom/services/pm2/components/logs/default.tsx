import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

interface PM2ExecutedLogsProps {
  serviceName: string;
  logs: string[];
}

export default function PM2ExecutedLogs({ serviceName, logs }: PM2ExecutedLogsProps) {
  const [expanded, setExpanded] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className='border-b border-gray-200 overflow-hidden'>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className='bg-gray-50 px-3 py-2 flex items-center justify-between text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition'
      >
        <span className='flex items-center gap-1'>
          {expanded ? <ChevronDownIcon className='w-3.5 h-3.5' /> : <ChevronRightIcon className='w-3.5 h-3.5' />}
          Temp logs
        </span>
        <span className='text-gray-400 text-[10px]'>{logs.length} log counts</span>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${expanded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          maxHeight: expanded ? '200px' : '0px',
        }}
      >
        <div
          ref={logRef}
          className='bg-black text-white font-mono text-[11px] p-3 h-[200px] overflow-y-auto whitespace-pre-wrap'
        >
          {logs.length ? (
            logs.map((line, i) => (
              <div key={i} className='leading-relaxed'>
                {line}
              </div>
            ))
          ) : (
            <div className='text-gray-500 italic text-center'>No logs yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
