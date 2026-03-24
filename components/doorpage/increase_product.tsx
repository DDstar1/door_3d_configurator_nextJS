"use client";
import { useState } from "react";

export default function IncrementCounter() {
  const [value, setValue] = useState(1);

  return (
    <div className=" border flex gap-2 border-gray-300 items-center">
      <button
        onClick={() => setValue((v) => Math.max(0, v - 1))}
        className="px-3 py-1 bg-gray-200 border  border-gray-400 text-black h-full"
      >
        −
      </button>

      <span className="w-10 text-gray-500 text-center">{value}</span>

      <button
        onClick={() => setValue((v) => v + 1)}
        className="px-3 py-1 bg-gray-200 border border-gray-400 text-black h-full"
      >
        +
      </button>
    </div>
  );
}
