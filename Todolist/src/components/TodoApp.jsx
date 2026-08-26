import { useState } from 'react';
export const TodoApp = () => {
  const [task, setTask] = useState('');
  const [alltask, setAllTask] = useState([]);

  const taskHandle = () => {
    if (task.trim() === '') return;
    setAllTask([...alltask, { id: Date.now(), text: task }]);
    setTask('');
  };
  //  delete task

  const deleteTask = id => {
    const existingId = alltask.filter(task => task.id !== id);
    setAllTask(existingId);
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold mb-4">Todo List App</h1>
      {/* input field */}
      <div className="flex gap-2">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          type="text"
          name="text"
          id="text"
          placeholder="Enter a task"
          className=" border p-2 rounded grow"
        />
        <button
          onClick={taskHandle}
          className=" bg-blue-500 text-white font-semibold  rounded px-4 py-2"
        >
          Add task
        </button>
      </div>
      {/* Show Task */}

      <div>
        {alltask.length > 0 ? (
          <ul className=" space-y-2 mt-4">
            {alltask.map((task, index) => (
              <li
                key={index}
                className=" flex justify-between items-center py-2 bg-gray-100 rounded shadow-sm"
              >
                <span>{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className=" bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className=" text-gray-600 mt-4">No task yet.Add some!</p>
        )}
      </div>
    </div>
  );
};
