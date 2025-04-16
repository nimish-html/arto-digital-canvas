import React, { useEffect, useRef } from 'react';
import drawContributionGraph from 'github-contribution-graph';

interface ContributionsGraphProps {
  data: Record<string, any>;
  className?: string;
}

const ContributionsGraph: React.FC<ContributionsGraphProps> = ({ data, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    try {
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      // Make sure required theme levels exist in data
      const requiredLevels = ['level0', 'level1', 'level2', 'level3', 'level4'];
      for (const level of requiredLevels) {
        if (!data[level]) {
          throw new Error(`Missing required level: ${level}`);
        }
      }
      
      // Custom theme that matches the site's theme
      const customTheme = {
        background: 'transparent',
        text: 'var(--text-dark)',
        grade4: data.level4, // darkest shade - purple-dark
        grade3: data.level3, // medium-dark - between purple-dark and purple-medium
        grade2: data.level2, // medium - purple-medium
        grade1: data.level1, // light - between purple-medium and purple-light
        grade0: data.level0, // lightest - purple-light
      };
      
      // Dark mode theme
      const darkTheme = {
        background: 'transparent',
        text: '#E5E7EB', // light text color
        grade4: data.level4, // darkest shade (same as light mode for emphasis)
        grade3: data.level3, // medium-dark (slightly subdued)
        grade2: data.level2, // medium (darker in dark mode)
        grade1: data.level1, // light (darker in dark mode)
        grade0: data.level0, // lightest (dark but visible)
      };
      
      // Check if dark mode is active
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Configure the contribution graph
      drawContributionGraph({
        data,
        ssr: false,
        config: {
          graphWidth: window.innerWidth < 768 ? window.innerWidth - 40 : 723,
          graphHeight: 160,
          graphMountElement: containerRef.current,
          graphTheme: isDarkMode ? darkTheme : customTheme,
        },
      });
      
      // Add responsive adjustment
      const handleResize = () => {
        if (!containerRef.current) return;
        
        // Clear and redraw on resize
        containerRef.current.innerHTML = '';
        drawContributionGraph({
          data,
          ssr: false,
          config: {
            graphWidth: window.innerWidth < 768 ? window.innerWidth - 40 : 723,
            graphHeight: 160,
            graphMountElement: containerRef.current,
            graphTheme: isDarkMode ? darkTheme : customTheme,
          },
        });
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error rendering contribution graph:', error);
      
      // Fallback UI in case of error
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="p-4 text-center text-red-500">
            <p>Failed to load contribution graph.</p>
            <p class="text-xs mt-1">${error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        `;
      }
    }
  }, [data]);

  return (
    <div className={`contribution-graph overflow-x-auto ${className}`}>
      {/* Import CSS for tooltip styling */}
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/github-contribution-graph/src/style.css" 
        crossOrigin="anonymous"
      />
      
      <div ref={containerRef} className="min-h-[160px]"></div>
    </div>
  );
};

export default ContributionsGraph;