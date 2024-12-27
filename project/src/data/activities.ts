export interface Activity {
  id: string;
  type: 'meal' | 'sleep' | 'learning' | 'play' | 'exercise';
  title: string;
  description: string;
  duration?: string;
  timestamp: string;
  mood: 'happy' | 'neutral' | 'sad';
  completed?: boolean;
}

export const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'meal',
    title: 'Breakfast',
    description: 'Had oatmeal with fruits',
    timestamp: '2024-03-20T08:00:00',
    mood: 'happy',
    completed: false
  },
  {
    id: '2',
    type: 'learning',
    title: 'Reading Time',
    description: 'Read "The Very Hungry Caterpillar"',
    duration: '30 minutes',
    timestamp: '2024-03-20T10:00:00',
    mood: 'happy',
    completed: false
  },
  {
    id: '3',
    type: 'sleep',
    title: 'Afternoon Nap',
    description: 'Peaceful nap after lunch',
    duration: '2 hours',
    timestamp: '2024-03-20T13:00:00',
    mood: 'neutral',
    completed: false
  },
  {
    id: '4',
    type: 'play',
    title: 'Building Blocks',
    description: 'Created a tall tower with blocks',
    duration: '45 minutes',
    timestamp: '2024-03-20T16:00:00',
    mood: 'happy',
    completed: false
  },
  {
    id: '5',
    type: 'exercise',
    title: 'Dance Time',
    description: 'Danced to favorite songs',
    duration: '20 minutes',
    timestamp: '2024-03-20T17:30:00',
    mood: 'happy',
    completed: false
  }
];