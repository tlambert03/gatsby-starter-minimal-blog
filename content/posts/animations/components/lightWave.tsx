import React, { useMemo } from "react"
import FatArrow, { FatArrowProps } from "./fatArrow"
import * as THREE from "three"
import { GroupProps } from "@react-three/fiber"

interface ArrowWave {
  extent?: number
  density?: number
  wavelength?: number
  amplitude?: number
  phase?: number
  refractiveIndex?: number
  arrowprops?: FatArrowProps
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

function linspace(start: number, stop: number, steps: number) {
  const arr: Array<number> = []
  const step = (stop - start) / (steps - 1)
  for (let i = 0; i < steps; i++) {
    arr.push(start + step * i)
  }
  return arr
}

const C = 2.99792 * 10 ** 14 // speed of light in microns/s

const ArrowWave = ({
  extent = 2,
  density = 40,
  wavelength = 1,  // in a vacuum ... rather than requiring frequency
  amplitude = 0.5,
  phase = 0,
  refractiveIndex = 1,
  arrowprops: arrows = {},
  ...groupprops
}: ArrowWave & GroupProps) => {
  const halfExtent = extent / 2
  const xs = linspace(-halfExtent, halfExtent, (halfExtent * density) + 1)
  const trueWaveLength = wavelength / refractiveIndex
  const k = (2 * Math.PI) / trueWaveLength

  // const frequency = C / wavelength
  // const w = 2 * Math.PI * frequency
  // const t = 0

  return (
    <group {...groupprops}>
      {xs.map((x) => (
        <FatArrow
          key={x}
          position={[x, 0, 0]}
          dir={[0, amplitude * Math.cos(k * x + phase), 0]}
          {...arrows}
        />
      ))}
    </group>
  )
}

export default ArrowWave
