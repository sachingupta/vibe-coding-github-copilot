'use client';

import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
          className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500"
        />
        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}