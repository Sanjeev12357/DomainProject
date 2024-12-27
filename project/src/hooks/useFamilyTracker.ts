import { useState, useCallback } from 'react';
import { Child, Activity, CompletedActivity } from '@/types/types';

export function useFamilyTracker() {
  const [children, setChildren] = useState<Child[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [completedActivities, setCompletedActivities] = useState<CompletedActivity[]>([]);
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const addChild = useCallback((name: string, age: string, gender: string) => {
    const newChild: Child = {
      id: crypto.randomUUID(),
      name,
      age,
      gender,
      dateAdded: new Date().toISOString()
    };
    setChildren(prev => [...prev, newChild]);
  }, []);

  const addActivity = useCallback((
    name: string,
    category: string,
    duration: string,
    scheduledTime: string
  ) => {
    if (!children[selectedChild]) return;

    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name,
      category,
      duration,
      scheduledTime,
      childId: children[selectedChild].id,
      isDefault: false
    };
    setActivities(prev => [...prev, newActivity]);
  }, [children, selectedChild]);

  const toggleActivityCompletion = useCallback((activityId: string) => {
    const now = new Date().toISOString();
    const activity = activities.find(a => a.id === activityId);
    if (!activity || !children[selectedChild]) return;

    const existingCompletion = completedActivities.find(
      ca => ca.activityId === activityId && 
           ca.date === selectedDate && 
           ca.childId === children[selectedChild].id
    );

    if (existingCompletion) {
      setCompletedActivities(prev => prev.filter(ca => ca !== existingCompletion));
    } else {
      const newCompletion: CompletedActivity = {
        activityId,
        childId: children[selectedChild].id,
        date: selectedDate,
        completedAt: now,
        duration: activity.duration
      };
      setCompletedActivities(prev => [...prev, newCompletion]);
    }
  }, [activities, children, selectedChild, selectedDate, completedActivities]);

  return {
    children,
    activities,
    completedActivities,
    selectedChild,
    selectedDate,
    addChild,
    addActivity,
    toggleActivityCompletion,
    setSelectedChild,
    setSelectedDate
  };
}