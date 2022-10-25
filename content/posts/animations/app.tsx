import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Canvas, useFrame, ThreeElements, useThree } from "@react-three/fiber"
import { OrbitControls as OrbitControlsType } from "three-stdlib/controls/OrbitControls"
import { OrbitControls } from "@react-three/drei"
import ArrowWave from "./components/lightWave"

interface LightWaveProps {
  speed?: number
}

function LightWaves({
  speed = 0.04,
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

function Scene({ target = [6.4, 0.8, 0.8] }) {
  const { camera } = useThree()
  camera.position.set(6.7, 1, 3.6)

  const ctrls = useRef<OrbitControlsType>(null!)
  useLayoutEffect(() => {
    console.log(target)
    ctrls.current.target.set(...target)
  }, [target])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 3, 5]} />
      <LightWaves />
      {/* <axesHelper args={[5]} /> */}
      <OrbitControls ref={ctrls} />
    </>
  )
}

export default function BoxCanvas() {
  return (
    <div style={{ height: 400 }}>
      <Canvas shadows={true}>
        <Scene />
      </Canvas>
    </div>
  )
}
