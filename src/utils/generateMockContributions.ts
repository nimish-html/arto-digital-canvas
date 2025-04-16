// Helper function to generate mock contribution data for the GitHub-like graph

import { addDays, subDays, format } from '../utils/dateUtils';

interface ContributionDay {
  date: Date;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = no contributions, 4 = highest
}

// Function to determine activity level based on contribution count
const getActivityLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

// Generate realistic contribution patterns with active and inactive periods
export const generateMockContributions = (days: number = 365): ContributionDay[] => {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  const startDate = subDays(today, days - 1); // Go back 'days' days from today
  
  // Define activity patterns - more active on weekdays, less on weekends
  // Also create some streaks and breaks to make it look realistic
  
  // Generate some active periods (higher contribution density)
  const activePeriods: { start: number; end: number; intensity: number }[] = [
    // A very active month about 2 months ago
    { start: days - 90, end: days - 60, intensity: 0.8 },
    // Moderate activity last month
    { start: days - 30, end: days - 5, intensity: 0.6 },
    // Recent high activity
    { start: days - 14, end: days, intensity: 0.9 },
  ];
  
  // Generate all days
  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Base probability is lower on weekends
    let probability = isWeekend ? 0.2 : 0.4;
    
    // Check if current day is in any active period
    for (const period of activePeriods) {
      if (i >= period.start && i <= period.end) {
        probability *= period.intensity;
        break;
      }
    }
    
    // Add some randomness - occasional spikes or drops
    if (Math.random() > 0.95) {
      probability = Math.random() > 0.5 ? 0.9 : 0.1; // Random spikes or drops
    }
    
    // Generate contribution count based on probability
    let count = 0;
    if (Math.random() < probability) {
      // Generate a random count, with a bias towards smaller numbers
      const r = Math.random();
      if (r < 0.6) {
        count = Math.floor(Math.random() * 3) + 1; // 1-3
      } else if (r < 0.85) {
        count = Math.floor(Math.random() * 5) + 4; // 4-8
      } else if (r < 0.95) {
        count = Math.floor(Math.random() * 5) + 9; // 9-13
      } else {
        count = Math.floor(Math.random() * 7) + 14; // 14-20 (rare high activity)
      }
    }
    
    // Determine activity level
    const level = getActivityLevel(count);
    
    contributions.push({
      date,
      count,
      level
    });
  }
  
  return contributions;
};

// Calculate total contributions
export const getTotalContributions = (contributions: ContributionDay[]): number => {
  return contributions.reduce((sum, day) => sum + day.count, 0);
};