"use client";

import { useEffect, useState } from "react";

type Algo = "bubble" | "selection" | "insertion";

const ARRAY_SIZE = 40;
const MAX_VALUE = 300;

export default function AlgorithmPlayground() {
  const [array, setArray] = useState<number[]>([]);
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [speed, setSpeed] = useState(30);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    if (running) return;
    const arr = Array.from(
      { length: ARRAY_SIZE },
      () => Math.floor(Math.random() * MAX_VALUE) + 10
    );
    setArray(arr);
  }

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function bubbleSort() {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
  }

  async function selectionSort() {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) min = j;
      }
      [arr[i], arr[min]] = [arr[min], arr[i]];
      setArray([...arr]);
      await sleep(speed);
    }
  }

  async function insertionSort() {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }
  }

  async function run() {
    setRunning(true);

    if (algo === "bubble") await bubbleSort();
    if (algo === "selection") await selectionSort();
    if (algo === "insertion") await insertionSort();

    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-2xl font-bold">Algorithm Visualizer</h1>
      <p className="text-sm text-gray-600">
        Visualize sorting algorithms step by step
      </p>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value as Algo)}
          disabled={running}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
        </select>

        <button
          onClick={generateArray}
          disabled={running}
          className="rounded-lg bg-white border px-4 py-2 text-sm"
        >
          Generate Array
        </button>

        <button
          onClick={run}
          disabled={running}
          className="rounded-lg bg-black px-4 py-2 text-sm text-white"
        >
          Start
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm">Speed</span>
          <input
            type="range"
            min={5}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="mt-10 flex items-end justify-center gap-1 h-[350px] bg-white border rounded-xl p-4">
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{ height: value }}
            className="w-[10px] rounded-sm bg-indigo-500 transition-all duration-100"
          />
        ))}
      </div>
    </div>
  );
}
