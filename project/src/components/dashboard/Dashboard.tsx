import { useState } from 'react';
import { Activity } from '@/data/activities';
import { ActivityCalendar } from './ActivityCalendar';
import { ActivityTrends } from './ActivityTrends';
import { HabitStreak } from './HabitStreak';
import { ActivityTypeDistribution } from './ActivityTypeDistribution';
import { format, isSameDay } from 'date-fns';
import { ActivityCard } from '../ActivityCard';

interface DashboardProps {
  activities: Activity[];
  onDeleteActivity?: (id: string) => void;
  onUpdateActivity?: (id: string, updates: Partial<Activity>) => void;
}

export function Dashboard({ 
  activities,
  onDeleteActivity,
  onUpdateActivity
}: DashboardProps) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const selectedDayActivities = selectedDay
    ? activities
        .filter(activity => 
          isSameDay(new Date(activity.timestamp), selectedDay)
        )
        .sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HabitStreak activities={activities} />
        <ActivityTrends activities={activities} />
      </div>
      <ActivityCalendar 
        activities={activities} 
        onSelectDay={setSelectedDay}
        selectedDay={selectedDay}
      />
      {selectedDay && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">
            Activities for {format(selectedDay, 'MMMM d, yyyy')}
          </h3>
          {selectedDayActivities.length > 0 ? (
            <div className="space-y-4">
              {selectedDayActivities.map(activity => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity}
                  onDelete={onDeleteActivity}
                  onUpdate={onUpdateActivity}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No activities recorded for this day.</p>
          )}
        </div>
      )}
      <ActivityTypeDistribution activities={activities} />
    </div>
  );
}