import { useFamilyTracker } from '@/hooks/useFamilyTracker';
import { ChildSelector } from '@/components/dashboard/ChildSelector';
import { ProgressOverview } from '@/components/dashboard/ProgressOverview';
import { ActivityList } from '@/components/dashboard/ActivityList';
import { AddChildDialog } from '@/components/dialogs/AddChildDialog';
import { AddActivityDialog } from '@/components/dialogs/AddActivityDialog';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function FamilyDashboard() {
  const {
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
  } = useFamilyTracker();

  const getChildActivities = () => {
    return activities.filter(activity => 
      activity.childId === children[selectedChild]?.id
    );
  };

  const getDailyStats = () => {
    const childActivities = getChildActivities();
    const completedToday = completedActivities.filter(
      ca => ca.date === selectedDate && 
           ca.childId === children[selectedChild]?.id
    );

    return {
      total: childActivities.length,
      completed: completedToday.length,
      percentage: childActivities.length ? 
        Math.round((completedToday.length / childActivities.length) * 100) : 0,
      totalTime: completedToday.reduce((acc, curr) => 
        acc + parseInt(activities.find(a => a.id === curr.activityId)?.duration || '0'), 0
      )
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600">Family Activity Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <AddChildDialog onAddChild={addChild} />
              <AddActivityDialog onAddActivity={addActivity} />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ChildSelector
          children={children}
          selectedChild={selectedChild}
          onSelectChild={setSelectedChild}
        />

        {children.length > 0 ? (
          <>
            <ProgressOverview
              stats={getDailyStats()}
              childName={children[selectedChild].name}
            />
            <ActivityList
              activities={getChildActivities()}
              completedActivities={completedActivities}
              selectedDate={selectedDate}
              selectedChildId={children[selectedChild].id}
              onComplete={toggleActivityCompletion}
            />
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Add a child to start tracking activities.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}