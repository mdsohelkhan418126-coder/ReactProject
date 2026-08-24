import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  // incrcasement
  const handelIncreament = () => {
    setCount(count + 1);
  };
  // Decreament

  const handleDeceament = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // Reset

  const handleReset = () => {
    setCount(0);
  };
  return (
    <div className=" min-h-screen  bg-black  flex justify-center items-center">
      <div className=" bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className=" text-2xl font-bold mb-4 text-gray-800">Counter App</h1>
        <p className=" text-xl text-gray-600 mb-6">Count: {count}</p>

        <div className=" flex space-x-4">
          {/* incase button */}
          <button
            onClick={handelIncreament}
            className=" px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          >
            Increase (+)
          </button>
          {/* Decreament Button */}
          <button
            onClick={handleDeceament}
            className=" px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Decarease (-)
          </button>
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className=" px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-700 transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
