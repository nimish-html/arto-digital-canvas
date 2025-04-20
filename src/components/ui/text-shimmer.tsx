'use client';
import React, { useMemo, type JSX, useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  textLength?: number; // Optional parameter to specify text length for spread calculation
}

export function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2,
  textLength,
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  const dynamicSpread = useMemo(() => {
    // If textLength is provided, use it, otherwise use a default value
    const length = typeof textLength === 'number' ? textLength : 
                 (typeof children === 'string' ? children.length : 25);
    return length * spread;
  }, [children, spread, textLength]);

  const animation = {
    backgroundPosition: ['100% center', '0% center'],
  };

  const transition = {
    repeat: Infinity,
    duration,
    ease: 'linear',
  };

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start(animation, transition);
    }
  }, [isHovered, controls, animation, transition]);

  return (
    <MotionComponent
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
        'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
        '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={controls} 
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}
