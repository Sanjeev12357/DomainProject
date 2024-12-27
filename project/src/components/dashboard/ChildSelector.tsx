import { Child } from '@/types/types';
import { cn } from '@/lib/utils';

interface ChildSelectorProps {
  children: Child[];
  selectedChild: number;
  onSelectChild: (index: number) => void;
}

export function ChildSelector({ children, selectedChild, onSelectChild }: ChildSelectorProps) {
  return (
    <div className="flex space-x-4 mb-8 overflow-x-auto">
      {children.map((child, index) => (
        <button
          key={child.id}
          onClick={() => onSelectChild(index)}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center space-x-2",
            selectedChild === index
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          <span className="font-medium">{child.name}</span>
          <span className="text-sm opacity-75">({child.age}y)</span>
        </button>
      ))}
    </div>
  );
}