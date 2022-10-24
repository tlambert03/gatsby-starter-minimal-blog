import { ThreeElements } from "@react-three/fiber";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type FatArrowProps = {
  color?: string;
  coneHeight?: number;
  radius?: number;
  coneRadius?: number;
  radialSegments?: number;
  opacity?: number;
  norm?: boolean;
  dir?: THREE.Vector3;
  origin?: [number, number, number];
};

const UP = new THREE.Vector3(0, 1, 0);

export default function FatArrow({
  color = "blue",
  radius = 0.04,
  coneRadius = 2.6,
  coneHeight = 0.25,
  radialSegments = 30,
  dir = new THREE.Vector3(1, 1, 1),
  norm = false,
  opacity = 0.5,
  rotation,
  ...groupprops
}: FatArrowProps & ThreeElements["mesh"]) {
  const group = useRef<THREE.Group>(null!);
  coneHeight = Math.min(coneHeight, dir.length());
  const length = dir.length() - coneHeight;

  useLayoutEffect(() => {
    group.current.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
  }, [dir]);

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color, opacity, transparent: true }),
    [color, opacity]
  );

  return (
    <group {...groupprops} ref={group}>
      <mesh position={[0, length / 2, 0]} material={material}>
        <cylinderGeometry args={[radius, radius, length, radialSegments]} />
      </mesh>
      <mesh
        position={[0, length + (length < 0 ? -coneHeight : coneHeight) / 2, 0]}
        material={material}
      >
        <coneGeometry
          args={[radius * coneRadius, coneHeight, radialSegments]}
        />
      </mesh>
    </group>
  );
}
