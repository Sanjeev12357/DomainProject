import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const defaultCategories = [
  "Morning Routine",
  "Meals",
  "Education",
  "Physical Activity",
  "Creative Time",
  "Evening Routine",
  "Hygiene",
  "Chores",
  "Social Activities",
  "Free Time"
];

interface AddActivityDialogProps {
  onAddActivity: (name: string, category: string, duration: string, scheduledTime: string) => void;
}

export function AddActivityDialog({ onAddActivity }: AddActivityDialogProps) {
  const [newActivity, setNewActivity] = useState({
    name: '',
    category: '',
    duration: '',
    scheduledTime: ''
  });

  const handleSubmit = () => {
    if (newActivity.name && newActivity.category) {
      onAddActivity(
        newActivity.name,
        newActivity.category,
        newActivity.duration,
        newActivity.scheduledTime
      );
      setNewActivity({
        name: '',
        category: '',
        duration: '',
        scheduledTime: ''
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="activityName">Activity Name</Label>
            <Input
              id="activityName"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              placeholder="Enter activity name"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={newActivity.category}
              onValueChange={(value) => setNewActivity({ ...newActivity, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {defaultCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
              placeholder="Enter duration"
            />
          </div>
          <div>
            <Label htmlFor="scheduledTime">Schedule Time (optional)</Label>
            <Input
              id="scheduledTime"
              type="time"
              value={newActivity.scheduledTime}
              onChange={(e) => setNewActivity({ ...newActivity, scheduledTime: e.target.value })}
            />
          </div>
          <Button onClick={handleSubmit}>Add Activity</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}