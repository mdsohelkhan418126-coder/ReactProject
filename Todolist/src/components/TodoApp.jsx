import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 👇 Sortable আইটেমের জন্য আলাদা কম্পোনেন্ট (ভিতরে ড্র্যাগ হ্যান্ডেল থাকবে)
const SortableItem = ({
  task,
  editingId,
  editText,
  setEditText,
  saveEdit,
  startEdit,
  deleteTask,
  toggleComplete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // প্রায়োরিটি অনুযায়ী রঙ
  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300',
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition group"
    >
      {/* 👆 ড্র্যাগ হ্যান্ডেল (এই জায়গা টেনে সরান) */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 px-1 text-xl select-none"
      >
        ⠿
      </div>

      {/* চেকবক্স */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400 cursor-pointer"
      />

      {/* টেক্সট / এডিট */}
      <div className="flex-1 min-w-0">
        {editingId === task.id ? (
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
            className="w-full border-b-2 border-blue-400 outline-none bg-transparent px-1 dark:text-white"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-gray-800 dark:text-gray-200 ${
                task.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : ''
              }`}
            >
              {task.text}
            </span>
            {/* প্রায়োরিটি ব্যাজ */}
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityColors[task.priority || 'low']}`}
            >
              {task.priority || 'Low'}
            </span>
            {/* ডেডলাইন */}
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                📅 {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* অ্যাকশন বাটন */}
      <div className="flex gap-1">
        {editingId === task.id ? (
          <button
            onClick={() => saveEdit(task.id)}
            className="text-green-600 hover:text-green-800 font-medium px-2 py-1 text-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => startEdit(task)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700 px-2 py-1 text-sm"
        >
          ✕
        </button>
      </div>
    </li>
  );
};

// ==================== মূল অ্যাপ কম্পোনেন্ট ====================
export const TodoApp = () => {
  // লোকালস্টোরেজ
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  // DnD সেন্সর
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  // টাস্ক যোগ
  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        completed: false,
        priority: priority,
        dueDate: dueDate || null,
      },
    ]);
    setInput('');
    setDueDate('');
    setPriority('medium');
  };

  // ডিলিট
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // কমপ্লিট টগল
  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // এডিট
  const startEdit = task => {
    setEditingId(task.id);
    setEditText(task.text);
  };
  const saveEdit = id => {
    if (editText.trim() === '') {
      deleteTask(id);
    } else {
      setTasks(
        tasks.map(task =>
          task.id === id ? { ...task, text: editText } : task,
        ),
      );
    }
    setEditingId(null);
    setEditText('');
  };

  // ক্লিয়ার কমপ্লিটেড
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // 🔥 ড্র্যাগ শেষে অর্ডার পরিবর্তন
  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  // ফিল্টার + সার্চ
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'active'
        ? !task.completed
        : filter === 'completed'
          ? task.completed
          : true;
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const remainingCount = tasks.filter(task => !task.completed).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-2xl mx-auto p-6">
        {/* হেডার + ডার্ক মোড টগল */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            ✅ Todo List
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:scale-105 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* ইনপুট সেকশন */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-4 space-y-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              type="text"
              placeholder="Write a task..."
              className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>

          {/* প্রায়োরিটি + ডেডলাইন ড্রপডাউন */}
          <div className="flex flex-wrap gap-2">
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg text-sm"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* সার্চ + ফিল্টার + কাউন্ট */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-1.5 rounded-lg text-sm flex-1 min-w-30"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
              {remainingCount} left
            </span>
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex">
              {['all', 'active', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md capitalize text-sm transition ${
                    filter === f
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {tasks.some(t => t.completed) && (
              <button
                onClick={clearCompleted}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear ✓
              </button>
            )}
          </div>
        </div>

        {/* 📋 টাস্ক লিস্ট (DnD Context) */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTasks}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <SortableItem
                    key={task.id}
                    task={task}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    saveEdit={saveEdit}
                    startEdit={startEdit}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                  />
                ))
              ) : (
                <p className="text-center text-gray-400 dark:text-gray-500 py-10 bg-white dark:bg-gray-800 rounded-xl shadow">
                  {tasks.length === 0
                    ? 'Start by adding a task! 🚀'
                    : 'No tasks match your filter.'}
                </p>
              )}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
