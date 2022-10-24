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
// -----------------
// - A: amplitude (the peak magnitude of the oscillation),
// - k: spatial angular frequency (wavenumber) of the wave, describing how many
//   oscillations it completes per unit of space, and related to the wavelength
//   by the equation k = 2π/λ
// - ω: temporal angular frequency of the wave, describing how many oscillations
//   it completes per unit of time, and related to the period T by the equation
//   ω = 2π/T
// - φ: phase offset (describing how two waves can be out of sync with each other)

// wave travels in the x direction with speed ω/k

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
