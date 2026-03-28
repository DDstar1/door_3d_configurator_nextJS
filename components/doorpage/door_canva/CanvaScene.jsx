'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, Environment } from '@react-three/drei';
import { useState, Suspense } from 'react';
import { Model } from './Door_model';

function YellowCross({ position }) {
  const [x, y, z] = position;
  const size = 0.005;
  return (
    <group position={[x, y, z]}>
      <mesh>
        <boxGeometry args={[size * 6, size, size]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <boxGeometry args={[size, size * 6, size]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <boxGeometry args={[size, size, size * 6]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function AlbaCanva() {
  const [inputs, setInputs] = useState({ x: '', y: '', z: '' });
  const [markers, setMarkers] = useState([]);

  const handleAdd = () => {
    const x = parseFloat(inputs.x);
    const y = parseFloat(inputs.y);
    const z = parseFloat(inputs.z);
    if (isNaN(x) || isNaN(y) || isNaN(z)) return;
    setMarkers((prev) => [...prev, [x, y, z]]);
    setInputs({ x: '', y: '', z: '' });
  };

  const handleClear = () => setMarkers([]);

  const axisColor = { x: 'text-red-400', y: 'text-green-400', z: 'text-blue-400' };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Controls bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 mt-8 bg-neutral-900 shrink-0 flex-wrap border-b border-neutral-700">
        <span className="text-neutral-400 text-xs font-medium tracking-wide uppercase mr-1">Position</span>

        {['x', 'y', 'z'].map((axis) => (
          <div key={axis} className="flex items-center gap-1.5">
            <label className={`text-xs font-bold ${axisColor[axis]}`}>{axis.toUpperCase()}</label>
            <input type="number" placeholder="0" value={inputs[axis]} onChange={(e) => setInputs((prev) => ({ ...prev, [axis]: e.target.value }))} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} className="w-16 px-2 py-1.5 bg-neutral-800 border border-neutral-600 rounded-md text-white text-xs focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>
        ))}

        <button onClick={handleAdd} className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 text-xs font-semibold rounded-md transition-colors cursor-pointer">
          + Add Cross
        </button>

        {markers.length > 0 && (
          <>
            <button onClick={handleClear} className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-xs font-medium rounded-md transition-colors cursor-pointer">
              Clear All
            </button>
            <span className="text-neutral-500 text-xs">
              {markers.length} marker{markers.length > 1 ? 's' : ''}
            </span>
          </>
        )}
      </div>

      {/* Canvas */}
      <Canvas shadows camera={{ position: [0, 1, 2] }} className="flex-1 bg-[#1f1f1f]">
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        <axesHelper args={[10]} />
        <gridHelper args={[40, 20, 'red', 0x55ccff]} />
        <OrbitControls target={[0, 1, 0]} enablePan={true} />
        <directionalLight intensity={2} position={[2, 5, 1]} />
        <Suspense fallback={null}>{/* <Environment preset="city" /> */}</Suspense>
        <Model />
        {markers.map((pos, i) => (
          <YellowCross key={i} position={pos} />
        ))}
      </Canvas>
    </div>
  );
}
