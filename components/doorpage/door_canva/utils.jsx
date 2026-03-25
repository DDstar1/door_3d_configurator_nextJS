import { useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import { useControls } from "leva";

function Model() {
  const result = useGLTF("/models/door.glb");
  console.log(result);
  return <primitive object={result.scene} />;
}

function SphereWithTexture() {
  const texture = useTexture("/textures/wood/wood_texture.jpg");
  return (
    <mesh position={[-2, 3, 2]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function AnimatedBox() {
  const boxRef = useRef();

  const { color, speed } = useControls({
    color: "#0000ff",
    speed: { value: 0.005, min: 0.001, max: 0.08, step: 0.001 },
  });

  const [wireFrame, setWireFrame] = useState(false);

  const handleClick = () => {
    setWireFrame(!wireFrame);
    console.log("Box clicked! Wireframe mode:", !wireFrame);
  };

  useFrame(() => {
    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  });
  return (
    <mesh castShadow ref={boxRef} onClick={handleClick} position={[3, 3, 3]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} wireframe={wireFrame} />
    </mesh>
  );
}

function LightWithHelper() {
  const { intensity, color } = useControls({
    intensity: { value: 0.8, min: 0, max: 5, step: 0.1 },
    color: "#ffffff",
  });

  return <ambientLight intensity={0.8} />;
}
