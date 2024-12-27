import { format } from 'date-fns';
import { Activity } from '@/data/activities';
import { getActivityIcon } from '@/components/icons/ActivityIcons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle2 } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updates: Partial<Activity>) => void;
}

export function ActivityCard({ activity, onDelete, onUpdate }: ActivityCardProps) {
  const Icon = getActivityIcon(activity.type);
  
  const handleComplete = () => {
    if (onUpdate) {
      onUpdate(activity.id, {
        timestamp: new Date().toISOString(), // Update timestamp to current time
        completed: true
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 transition-transform hover:scale-102">
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-2 rounded-full",
          activity.type === 'meal' && "bg-orange-100 text-orange-600",
          activity.type === 'sleep' && "bg-blue-100 text-blue-600",
          activity.type === 'learning' && "bg-purple-100 text-purple-600",
          activity.type === 'play' && "bg-green-100 text-green-600",
          activity.type === 'exercise' && "bg-red-100 text-red-600"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900">{activity.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {format(new Date(activity.timestamp), 'h:mm a')}
              </span>
              {onUpdate && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleComplete}
                  className="h-8 w-8 text-gray-500 hover:text-green-600"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(activity.id)}
                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-1">{activity.description}</p>
          {activity.duration && (
            <span className="inline-block mt-2 text-sm text-gray-500">
              Duration: {activity.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}