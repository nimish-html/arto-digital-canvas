// Helper function to generate mock contribution data for the GitHub-like graph

// Get random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Function to determine activity level based on contribution count
const getActivityLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

// Helper function to generate mock contribution data for the GitHub-like graph
export const generateContributionData = () => {
  const data: Record<string, any> = {
    "2025": [],
    "2024": []
  };

  // Define custom theme levels - these keys are expected by the library
  data.level0 = "#EEEAFF"; // Lightest color - purple-light (no contributions)
  data.level1 = "#D6CCFF"; // Light color (1-2 contributions)
  data.level2 = "#A794FF"; // Medium color - purple-medium (3-5 contributions)
  data.level3 = "#9B89E4"; // Medium-dark color (6-10 contributions)
  data.level4 = "#6D5BDC"; // Darkest color - purple-dark (>10 contributions)

  const today = new Date();
  const currentYear = today.getFullYear();

  // Days in the years
  const daysCount = {
    2024: 366, // Leap year
    2025: 365
  };

  // Create date objects for each day in the years
  const dates: Record<number, Date[]> = {
    2024: [],
    2025: []
  };

  // Generate dates for 2024 (or current year - 1)
  let startDate = new Date(2024, 0, 1);
  for (let i = 0; i < daysCount[2024]; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates[2024].push(date);
  }

  // Generate dates for 2025 (or current year)
  startDate = new Date(2025, 0, 1);
  for (let i = 0; i < daysCount[2025]; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Stop at today for current year
    if (date > today && currentYear === 2025) {
      break;
    }
    
    dates[2025].push(date);
  }

  // Generate contributions for each year
  const generateContributions = (dates: Date[]) => {
    return dates.map(date => {
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Base probability of activity (less likely on weekends)
      let activityProbability = isWeekend ? 0.3 : 0.6;
      
      // Add some pattern/streaks
      // More active in spring and summer months (3-8)
      const month = date.getMonth();
      if (month >= 2 && month <= 7) {
        activityProbability += 0.2;
      }
      
      // Special "streak weeks" with high activity
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000)) + 1;
      
      // 3 intense weeks randomly placed
      const streakWeeks = [
        getRandomInt(30, 60),  // early streak
        getRandomInt(120, 180), // mid-year streak
        getRandomInt(250, 310)  // late year streak
      ];
      
      // Check if current day is in a streak week
      const inStreakWeek = streakWeeks.some(weekStart => 
        dayOfYear >= weekStart && dayOfYear < weekStart + 7
      );
      
      if (inStreakWeek) {
        activityProbability += 0.3;
      }
      
      // Determine if there's activity on this day
      const hasActivity = Math.random() < activityProbability;
      
      // Generate contribution count
      let done = 0;
      if (hasActivity) {
        // Weight towards smaller numbers with occasional spikes
        const rand = Math.random();
        if (rand < 0.6) {
          done = getRandomInt(1, 3); // 60% chance: 1-3 contributions
        } else if (rand < 0.85) {
          done = getRandomInt(4, 7); // 25% chance: 4-7 contributions
        } else if (rand < 0.95) {
          done = getRandomInt(8, 12); // 10% chance: 8-12 contributions
        } else {
          done = getRandomInt(13, 24); // 5% chance: 13-24 contributions (rare spikes)
        }
      }
      
      // Get level based on done count
      const level = getActivityLevel(done);
      
      return {
        done,
        date: formatDate(date),
        level: level
      };
    });
  };

  // Generate contributions for each year
  data["2024"] = generateContributions(dates[2024]);
  data["2025"] = generateContributions(dates[2025]);

  return data;
};