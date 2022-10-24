import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type VectorProps = {
  color?: string;
  coneHeight?: number;
  radius?: number;
  coneRadius?: number;
  radialSegments?: number;
  height?: number;
  norm?: boolean;
  dir?: THREE.Vector3;
  origin?: [number, number, number];
};

const Vector = ({
  color = "blue",
  radius = 0.04,
  coneRadius = 2.6,
  coneHeight = 0.25,
  radialSegments = 30,
  dir = new THREE.Vector3(1, 0, 0),
  origin = [0, 0, 0],
  norm = false,
  ...meshprops
}: VectorProps) => {
  const group = useRef<THREE.Group>(null!);
  coneHeight = Math.min(coneHeight, dir.length());
  const length = dir.length() - coneHeight;

  useLayoutEffect(() => {
    group.current.position.set(0, 0, 0);
    group.current.lookAt(dir);
    group.current.position.set(origin[0], origin[1], origin[2]);
  }, [dir, origin]);
  
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color }),
    [color]
  );

  return (
    <group {...meshprops} ref={group}>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, length / 2]}
        material={material}
      >
        <cylinderGeometry args={[radius, radius, length, radialSegments]} />
      </mesh>
      <mesh
        position={[0, 0, length + (length < 0 ? -coneHeight : coneHeight) / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        material={material}
      >
        <coneGeometry
          args={[radius * coneRadius, coneHeight, radialSegments]}
        />
      </mesh>
    </group>
  );
};

const LightWave = ({
  nVectors = 30,
  spacing = 0.3,
  wavelength = 0.2,
  amplitude = 2,
  phase = 0,
  arrows = {},
  ...props
}) => (
  <mesh {...props}>
    {[...Array(nVectors).keys()].map((i) => (
      <Vector
        key={i}
        origin={[i * spacing, 0, 0]}
        dir={new THREE.Vector3(0, amplitude * Math.sin(i * wavelength + phase), 0)}
        {...arrows}
      />
    ))}
  </mesh>
);

function LightWaves(props: ThreeElements["mesh"]) {
  const speed = 0.02;
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);
  const [phase, setPhase] = useState(0);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => setPhase(phase + speed));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <LightWave phase={phase} />
      {/* <LightWave phase={phase + Math.PI / 2} rotation={[Math.PI / 2, 0, 0]} arrows={{color: 'red'}}/> */}
    </mesh>
  );
}

export default function BoxCanvas() {
  return (
    <div style={{ height: 400 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 5]} />
        <LightWaves />
        <axesHelper args={[5]} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
