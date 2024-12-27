import { Activity } from '@/data/activities';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface ActivityCalendarProps {
  activities: Activity[];
  month?: Date;
  onSelectDay: (date: Date) => void;
  selectedDay?: Date | null;
}

export function ActivityCalendar({ 
  activities, 
  month = new Date(), 
  onSelectDay,
  selectedDay 
}: ActivityCalendarProps) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getActivityCountForDay = (date: Date) => {
    return activities.filter(activity => 
      format(new Date(activity.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ).length;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{format(month, 'MMMM yyyy')}</h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">{day}</div>
        ))}
        {days.map((day, i) => {
          const activityCount = getActivityCountForDay(day);
          const isSelected = selectedDay && isSameDay(day, selectedDay);
          return (
            <button
              key={day.toString()}
              onClick={() => onSelectDay(day)}
              style={{ gridColumnStart: i === 0 ? day.getDay() + 1 : undefined }}
              className={`aspect-square flex items-center justify-center rounded-full text-sm
                transition-colors cursor-pointer hover:bg-green-50
                ${isSelected 
                  ? 'ring-2 ring-green-500 ring-offset-2' 
                  : ''
                }
                ${activityCount > 0 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'text-gray-400'}`}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}