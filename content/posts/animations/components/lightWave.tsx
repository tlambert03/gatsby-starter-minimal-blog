import React, { useMemo } from "react"
import FatArrow, { FatArrowProps } from "./fatArrow"
import * as THREE from "three"
import { GroupProps } from "@react-three/fiber"

interface ArrowWave {
  nVectors?: number
  density?: number
  wavelength?: number
  amplitude?: number
  phase?: number
  arrows?: FatArrowProps
}

// E(x, t) = A cos(kx - ωt + φ)
// - E: electric field
// - x: position
// - t: time
// - A: amplitude
// - k: wave number
// - ω: angular frequency
// - φ: phase

const ArrowWave = ({
  nVectors = 120,
  density = 60,
  wavelength = 1,
  amplitude = 2,
  phase = 0,
  arrows = {},
  ...groupprops
}: ArrowWave & GroupProps) => {
  const spacing = (2 * Math.PI) / density

  return (
    <group {...groupprops}>
      {[...Array(nVectors).keys()].map((i) => (
        <FatArrow
          key={i}
          position={[i * spacing, 0, 0]}
          dir={[0, amplitude * Math.sin(i * spacing * (1 / wavelength) + phase), 0]}
          {...arrows}
        />
      ))}
    </group>
  )
}

export default ArrowWave
