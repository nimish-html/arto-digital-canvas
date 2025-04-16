import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: Date;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = no contributions, 4 = highest
}

interface ContributionProps {
  contributions: ContributionDay[];
  className?: string;
}

// Helper function to format dates in a readable format
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ContributionGraph: React.FC<ContributionProps> = ({ contributions, className = '' }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    date: string;
    count: number;
    position: { x: number; y: number };
  }>({
    visible: false,
    content: '',
    date: '',
    count: 0,
    position: { x: 0, y: 0 }
  });

  // Get months from the contributions data
  const getMonths = (): string[] => {
    const months: string[] = [];
    const seenMonths = new Set<string>();
    
    contributions.forEach(day => {
      const monthName = day.date.toLocaleString('en-US', { month: 'short' });
      if (!seenMonths.has(monthName)) {
        seenMonths.add(monthName);
        months.push(monthName);
      }
    });
    
    // Return only the last 12 months, or fewer if not enough data
    return months.slice(-12);
  };

  const months = getMonths();
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  
  // Days of week abbreviations
  const daysOfWeek = ['Mon', 'Wed', 'Fri'];

  // Generate the color for a contribution cell based on its level
  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
      case 1:
        return 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800/50';
      case 2:
        return 'bg-indigo-200 dark:bg-indigo-800/40 border-indigo-300 dark:border-indigo-700/50';
      case 3:
        return 'bg-indigo-300 dark:bg-indigo-700/50 border-indigo-400 dark:border-indigo-600/50';
      case 4:
        return 'bg-indigo-500 dark:bg-indigo-500/70 border-indigo-600 dark:border-indigo-400/50';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  // Handle mouse enter on a contribution cell
  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    setTooltip({
      visible: true,
      content: `${day.count} ${day.count === 1 ? 'creation' : 'creations'} on ${formatDate(day.date)}`,
      date: formatDate(day.date),
      count: day.count,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + scrollTop
      }
    });
  };

  // Handle mouse leave from a contribution cell
  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className={`${className} relative`}>
      <div className="mb-4 flex justify-between items-center">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-semibold text-gray-800 dark:text-gray-200"
        >
          {totalContributions} Contributions in 2025
        </motion.h3>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400"
        >
          <span>Less</span>
          <div className={`w-3 h-3 rounded-sm ${getLevelColor(0)}`}></div>
          <div className={`w-3 h-3 rounded-sm ${getLevelColor(1)}`}></div>
          <div className={`w-3 h-3 rounded-sm ${getLevelColor(2)}`}></div>
          <div className={`w-3 h-3 rounded-sm ${getLevelColor(3)}`}></div>
          <div className={`w-3 h-3 rounded-sm ${getLevelColor(4)}`}></div>
          <span>More</span>
        </motion.div>
      </div>

      <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-indigo-700 scrollbar-track-transparent">
        <div className="flex flex-col mr-2">
          {daysOfWeek.map((day, i) => (
            <div 
              key={day} 
              className="h-[11px] text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center"
              style={{ marginTop: i === 0 ? '29px' : (i === 1 ? '23px' : '23px') }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Month labels */}
          <div className="flex">
            {months.map((month, index) => (
              <div 
                key={month + index} 
                className="text-xs font-medium text-gray-500 dark:text-gray-400 w-[13px] mx-[2px] text-center"
                style={{ marginLeft: index === 0 ? '0' : '34px' }}
              >
                {month}
              </div>
            ))}
          </div>

          {/* Contribution cells */}
          <div className="flex mt-6">
            {contributions.map((day, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.001,
                    duration: 0.2 
                  } 
                }}
                whileHover={{ scale: 1.3, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                className={`w-[11px] h-[11px] m-[2px] rounded-sm border ${getLevelColor(day.level)} cursor-pointer`}
                onMouseEnter={(e) => handleMouseEnter(day, e)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      <AnimatedTooltip tooltip={tooltip} />
    </div>
  );
};

// Animated tooltip component
const AnimatedTooltip = ({ tooltip }: { 
  tooltip: {
    visible: boolean;
    content: string;
    date: string;
    count: number;
    position: { x: number; y: number };
  }
}) => {
  if (!tooltip.visible) return null;

  return (
    <motion.div
      className="fixed z-50 transform -translate-x-1/2 -translate-y-full pt-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      style={{ 
        left: tooltip.position.x, 
        top: tooltip.position.y - 10 
      }}
    >
      <div className="bg-gray-800 dark:bg-gray-700 text-white px-3 py-2 rounded shadow-lg text-xs">
        <div className="font-semibold">{tooltip.date}</div>
        <div>
          {tooltip.count === 0 ? (
            "No contributions"
          ) : (
            <span className="text-indigo-300">{tooltip.count} {tooltip.count === 1 ? 'contribution' : 'contributions'}</span>
          )}
        </div>
      </div>
      <div 
        className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-800 dark:bg-gray-700 -translate-x-1/2 rotate-45"
      />
    </motion.div>
  );
};

export default ContributionGraph;