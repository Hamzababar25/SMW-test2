"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [value, setValue] = useState("");
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      const response = await axios.get(`http://localhost:3002/numbers`);
      setNumbers(response.data.numbers);
    };
    fetchNumbers();
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAdd = async () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      await axios.post(`http://localhost:3002/numbers`, { number: num });
      setValue("");
      const response = await axios.get(`http://localhost:3002/numbers`);
      setNumbers(response.data.numbers);
    }
  };

  const handleFindMin = async () => {
    const response = await axios.get(`http://localhost:3002/numbers/min`);
    setMinValue(response.data.min);
  };

  const handleFindMax = async () => {
    const response = await axios.get(`http://localhost:3002/numbers/max`);
    setMaxValue(response.data.max);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-5xl font-bold text-white mb-10">Number Storage</h1>
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className="mb-4 p-3 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter a number"
        />
        <button
          onClick={handleAdd}
          className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Number
        </button>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleFindMin}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Find Min
          </button>
          <button
            onClick={handleFindMax}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Find Max
          </button>
        </div>
        <div className="text-center">
          {minValue !== null && (
            <p className="text-lg font-semibold">
              Minimum Value: <span className="text-green-600">{minValue}</span>
            </p>
          )}
          {maxValue !== null && (
            <p className="text-lg font-semibold">
              Maximum Value: <span className="text-red-600">{maxValue}</span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">All Numbers:</h2>
        <ul className="list-disc list-inside">
          {numbers.map((num, index) => (
            <li key={index} className="text-lg">
              {num}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// adding comments for new branch
