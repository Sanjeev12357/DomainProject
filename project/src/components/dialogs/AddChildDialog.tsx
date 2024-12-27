import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddChildDialogProps {
  onAddChild: (name: string, age: string, gender: string) => void;
}

export function AddChildDialog({ onAddChild }: AddChildDialogProps) {
  const [newChild, setNewChild] = useState({ name: '', age: '', gender: '' });

  const handleSubmit = () => {
    if (newChild.name && newChild.age) {
      onAddChild(newChild.name, newChild.age, newChild.gender);
      setNewChild({ name: '', age: '', gender: '' });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Child</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Child</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="childName">Name</Label>
            <Input
              id="childName"
              value={newChild.name}
              onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
              placeholder="Enter child's name"
            />
          </div>
          <div>
            <Label htmlFor="childAge">Age</Label>
            <Input
              id="childAge"
              type="number"
              value={newChild.age}
              onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
              placeholder="Enter age"
            />
          </div>
          <div>
            <Label htmlFor="childGender">Gender</Label>
            <Select
              value={newChild.gender}
              onValueChange={(value) => setNewChild({ ...newChild, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit}>Add Child</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}