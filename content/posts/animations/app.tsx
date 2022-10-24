import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import LightWave from "./components/lightWave";
import FatArrow from "./components/fatArrow";

function LightWaves(props: ThreeElements["mesh"]) {
  const speed = 0.02;
  // This reference will give us direct access to the mesh
  const [phase, setPhase] = useState(0);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => setPhase(phase + speed));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props}>
      <LightWave phase={phase} />
      <LightWave wavelength={0.3} phase={phase + Math.PI / 2} rotation={[Math.PI / 2, 0, 0]} arrows={{color: 'red'}}/>
    </mesh>
  );
}

export default function BoxCanvas() {
  return (
    <div style={{ height: 400 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 5]} />
        <LightWaves  />
        <axesHelper args={[5]} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
