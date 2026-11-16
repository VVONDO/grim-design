"use client";

// Used only when /public/models/cap.glb exists. Untested until a model is added.
import { Center, useGLTF } from "@react-three/drei";

export function CapModel({ url, size = 2.2 }: { url: string; size?: number }) {
  const { scene } = useGLTF(url);
  return (
    <group>
      <hemisphereLight args={["#ffffff", "#0a0a0a", 0.6]} />
      <spotLight position={[1.5, 4, 4]} angle={0.5} penumbra={0.9} intensity={60} />
      <Center>
        <group scale={size}>
          <primitive object={scene} />
        </group>
      </Center>
    </group>
  );
}
