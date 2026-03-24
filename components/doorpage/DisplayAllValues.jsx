"use client";

import { useDoorStore } from "@/store/door_store";
import { useState } from "react";
export function DisplayAllValues() {
  const door = useDoorStore((s) => s.door);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
      >
        View Current Door State
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl p-6 z-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Current Door State
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-800 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[400px] overflow-y-auto space-y-2 text-sm">
              {Object.entries(door).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between border-b border-gray-200 py-2"
                >
                  <span className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="font-medium text-gray-900">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
