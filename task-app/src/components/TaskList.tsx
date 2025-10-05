'use client';

import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Only run on client side
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
      <AddTask onAdd={addTask} />
      <div className="space-y-2">
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}