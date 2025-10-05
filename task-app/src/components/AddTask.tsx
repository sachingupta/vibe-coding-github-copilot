'use client';

interface AddTaskProps {
  onAdd: (title: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('taskTitle') as HTMLInputElement;
    const title = input.value.trim();
    
    if (title) {
      onAdd(title);
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          name="taskTitle"
          placeholder="Add a new task..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}