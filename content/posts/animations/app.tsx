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
        arrowprops={{ color: "magenta" }}
      />
    </group>
  )
}

const GridHelper3D = ({
  size = 2,
  divisions = 20,
  color1 = undefined,
  color2 = "#CCCCCC",
}) => {
  return (
    <>
      <gridHelper args={[size, divisions, color1, color2]} />
      <gridHelper
        args={[size, divisions, color1, color2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <gridHelper
        args={[size, divisions, color1, color2]}
        rotation={[0, 0, Math.PI / 2]}
      />
    </>
  )
}

//  target = [6.4, 0.8, 0.8]
function Scene({ target = [0, 0, 0], position = [0, 0, 5] }) {
  const { camera } = useThree()
  camera.position.set(...position)

  const ctrls = useRef<OrbitControlsType>(null!)
  useLayoutEffect(() => {
    ctrls.current.target.set(...target)
  }, [target])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 3, 5]} />
      <LightWaves />
      <axesHelper args={[1]} />
      <GridHelper3D />
      <OrbitControls ref={ctrls} />
    </>
  )
}

export default function BoxCanvas() {
  return (
    <div style={{ height: 400 }}>
      <Canvas shadows={true} orthographic={true} camera={{ zoom: 300 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
