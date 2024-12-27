import { DailyStats } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressOverviewProps {
  stats: DailyStats;
  childName: string;
}

export function ProgressOverview({ stats, childName }: ProgressOverviewProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Daily Progress - {childName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-2xl font-bold">
              {stats.completed} / {stats.total} Activities
            </div>
            <div className="text-sm text-gray-500">
              Total Time: {stats.totalTime} minutes
            </div>
          </div>
          <div className="w-32 h-32 rounded-full border-8 border-indigo-200 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {stats.percentage}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}