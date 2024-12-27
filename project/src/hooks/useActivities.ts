import { useState, useCallback } from 'react';
import { Activity } from '@/data/activities';

export function useActivities(initialActivities: Activity[]) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addActivity = useCallback((activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: crypto.randomUUID(),
    };
    setActivities(prev => [newActivity, ...prev].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  }, []);

  const updateActivity = useCallback((id: string, updates: Partial<Activity>) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, ...updates }
          : activity
      ).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    );
  }, []);

  return {
    activities,
    addActivity,
    deleteActivity,
    updateActivity,
  };
}