
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TransitionEffectProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TransitionEffect: React.FC<TransitionEffectProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'opacity-0 transform translate-y-4',
        isVisible && 'opacity-100 translate-y-0 transition-all duration-700 ease-in-out-expo',
        className
      )}
    >
      {children}
    </div>
  );
};

export default TransitionEffect;
