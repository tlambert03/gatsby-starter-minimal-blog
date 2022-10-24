import React from "react";
import FatArrow from "./fatArrow";
import * as THREE from "three";

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
      <FatArrow
        key={i}
        position={[i * spacing, 0, 0]}
        dir={
          new THREE.Vector3(0, amplitude * Math.sin(i * wavelength + phase), 0)
        }
        {...arrows}
      />
    ))}
  </mesh>
);

export default LightWave;