import { Activity, CompletedActivity } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityListProps {
  activities: Activity[];
  completedActivities: CompletedActivity[];
  selectedDate: string;
  selectedChildId: string;
  onComplete: (activityId: string) => void;
}

export function ActivityList({
  activities,
  completedActivities,
  selectedDate,
  selectedChildId,
  onComplete
}: ActivityListProps) {
  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.category]) {
      acc[activity.category] = [];
    }
    acc[activity.category].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  const isCompleted = (activityId: string) => {
    return completedActivities.some(
      ca => ca.activityId === activityId && 
           ca.date === selectedDate &&
           ca.childId === selectedChildId
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedActivities).map(([category, categoryActivities]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={isCompleted(activity.id) ? "default" : "outline"}
                      className="min-w-[40px] h-10"
                      onClick={() => onComplete(activity.id)}
                    >
                      {isCompleted(activity.id) ? "✓" : " "}
                    </Button>
                    <div>
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-sm text-gray-500">
                        {activity.duration} minutes
                        {activity.scheduledTime && ` • ${activity.scheduledTime}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}