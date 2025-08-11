import { ReactNode } from 'react';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  icon?: string;
  iconColor?: string;
  className?: string;
  onMouseEnter?: () => void;
  'data-testid'?: string;
}

export default function TerminalWindow({ 
  title, 
  children, 
  icon, 
  iconColor = 'text-matrix',
  className = '',
  onMouseEnter,
  'data-testid': testId
}: TerminalWindowProps) {
  return (
    <div 
      className={`terminal-window p-6 ${className}`}
      onMouseEnter={onMouseEnter}
      data-testid={testId}
    >
      <div className="bg-gray-900 rounded-t-lg p-3 mb-6 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2">
          {icon && <i className={`${icon} ${iconColor}`}></i>}
          <span className="font-mono text-sm">{title}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
