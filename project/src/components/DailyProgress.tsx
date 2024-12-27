import { Activity } from '@/data/activities';

interface DailyProgressProps {
  activities: Activity[];
}

export function DailyProgress({ activities }: DailyProgressProps) {
  const getTotalsByType = () => {
    return activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const totals = getTotalsByType();
  const categories = [
    { type: 'meal', label: 'Meals', color: 'bg-orange-500' },
    { type: 'sleep', label: 'Sleep', color: 'bg-blue-500' },
    { type: 'learning', label: 'Learning', color: 'bg-purple-500' },
    { type: 'play', label: 'Play', color: 'bg-green-500' },
    { type: 'exercise', label: 'Exercise', color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Daily Progress</h2>
      <div className="space-y-4">
        {categories.map(({ type, label, color }) => (
          <div key={type} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{label}</span>
              <span>{totals[type] || 0} activities</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(((totals[type] || 0) / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}