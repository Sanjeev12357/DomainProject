import { Activity } from '@/data/activities';
import { format, differenceInDays } from 'date-fns';

interface HabitStreakProps {
  activities: Activity[];
}

export function HabitStreak({ activities }: HabitStreakProps) {
  const calculateStreak = () => {
    const dates = activities
      .map(a => format(new Date(a.timestamp), 'yyyy-MM-dd'))
      .sort()
      .reverse();
    
    if (dates.length === 0) return 0;
    
    let streak = 1;
    let currentDate = new Date(dates[0]);
    
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i]);
      if (differenceInDays(currentDate, prevDate) === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Current Streak</h3>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-indigo-600">
          {calculateStreak()}
        </span>
        <span className="text-gray-600">days</span>
      </div>
    </div>
  );
}