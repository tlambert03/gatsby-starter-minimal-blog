import React, { useState } from "react"
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import ArrowWave from "./components/lightWave"

interface LightWaveProps {
  speed?: number
}

function LightWaves({
  speed = 0.02,
  ...props
}: LightWaveProps & ThreeElements["group"]) {
  const [phase, setPhase] = useState(0)
  useFrame((state, delta) => setPhase(phase - speed))
  return (
    <group {...props}>
      <ArrowWave phase={phase} />
      <ArrowWave
        phase={phase + Math.PI / 2}
        rotation={[Math.PI / 2, 0, 0]}
        arrows={{ color: "magenta" }}
      />
    </group>
  )
}

export default function BoxCanvas() {
  return (
    <div style={{ height: 400 }}>
      <Canvas shadows={true}>
        <ambientLight intensity={0.1} />
        <pointLight position={[4, 3, 5]} />
        <LightWaves />
        {/* <axesHelper args={[5]} /> */}
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}
