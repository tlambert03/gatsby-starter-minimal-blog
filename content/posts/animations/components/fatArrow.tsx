import { GroupProps } from "@react-three/fiber"
import React, { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"

export interface FatArrowProps {
  dir?: [number, number, number]
  color?: string
  radius?: number
  coneRadius?: number
  coneHeight?: number
  radialSegments?: number
  opacity?: number
}

const UP = new THREE.Vector3(0, 1, 0)

export default function FatArrow({
  dir = [0, 1, 0],
  color = "#00FF00",
  radius = 0.01,
  coneRadius = 1.5,
  coneHeight = 0.05,
  radialSegments = 30,
  opacity = 1,
  ...groupprops
}: FatArrowProps & GroupProps) {
  const _dir = useMemo(() => new THREE.Vector3(...dir), [dir])
  const group = useRef<THREE.Group>(null!)
  coneHeight = Math.min(coneHeight, _dir.length())
  const length = _dir.length() - coneHeight

  useLayoutEffect(() => {
    group.current.quaternion.setFromUnitVectors(UP, _dir.clone().normalize())
  }, [_dir])

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color, opacity, transparent: true }),
    [color, opacity]
  )

  return (
    <group {...groupprops} ref={group}>
      <mesh position={[0, length / 2, 0]} material={material}>
        <cylinderGeometry args={[radius, radius, length, radialSegments]} />
      </mesh>
      <mesh position={[0, length + coneHeight / 2, 0]} material={material}>
        <coneGeometry args={[radius * coneRadius, coneHeight, radialSegments]} />
      </mesh>
    </group>
  )
}
