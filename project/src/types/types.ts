export interface Child {
  id: string;
  name: string;
  age: string;
  gender: string;
  dateAdded: string;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  duration: string;
  scheduledTime?: string;
  childId: string;
  isDefault: boolean;
}

export interface CompletedActivity {
  activityId: string;
  childId: string;
  date: string;
  completedAt: string;
  duration: string;
}

export interface DailyStats {
  total: number;
  completed: number;
  percentage: number;
  totalTime: number;
}