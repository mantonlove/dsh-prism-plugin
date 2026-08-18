/** Damped spring engine: convergence, settle snap, and clamping. */
import { describe, expect, it } from 'vitest'
import {
  advanceSpring, clampValue, createSpring, springSettled,
  SPRING_STIFFNESS,
} from '../src/client/spring.ts'

describe('createSpring', () => {
  it('rests exactly on the initial target', () => {
    const spring = createSpring(42)
    expect(spring.position).toBe(42)
    expect(spring.velocity).toBe(0)
    expect(springSettled(spring, 42)).toBe(true)
  })
})

describe('advanceSpring', () => {
  it('moves toward the target monotonically without overshoot (critical damping)', () => {
    const spring = createSpring(0)
    let previous = 0
    for (let i = 0; i < 120; i += 1) {
      advanceSpring(spring, 100, 1 / 60)
      expect(spring.position).toBeGreaterThanOrEqual(previous)
      expect(spring.position).toBeLessThanOrEqual(100 + 1e-9)
      previous = spring.position
    }
    expect(springSettled(spring, 100)).toBe(true)
  })

  it('snaps to the target within about half a second', () => {
    const spring = createSpring(0)
    let settled = false
    for (let i = 0; i < 60; i += 1) {
      advanceSpring(spring, 100, 1 / 60)
      if (springSettled(spring, 100)) { settled = true; break }
    }
    expect(settled).toBe(true)
  })

  it('handles a zero-dt frame as a no-op', () => {
    const spring = createSpring(10)
    advanceSpring(spring, 90, 0)
    expect(spring.position).toBe(10)
    expect(spring.velocity).toBe(0)
  })

  it('stays stable across a large frame gap (substepped)', () => {
    const spring = createSpring(0)
    advanceSpring(spring, 100, 0.1)
    expect(spring.position).toBeGreaterThanOrEqual(0)
    expect(spring.position).toBeLessThanOrEqual(100)
    expect(Number.isFinite(spring.position)).toBe(true)
  })
})

describe('clampValue', () => {
  it('clamps into the range', () => {
    expect(clampValue(120, 0, 100, 50)).toBe(100)
    expect(clampValue(-5, 0, 100, 50)).toBe(0)
    expect(clampValue(60, 0, 100, 50)).toBe(60)
  })

  it('returns the fallback for non-finite input', () => {
    expect(clampValue(Number.NaN, 0, 100, 50)).toBe(50)
    expect(clampValue(Number.POSITIVE_INFINITY, 0, 100, 50)).toBe(50)
  })

  it('references the exported stiffness for consumers', () => {
    expect(SPRING_STIFFNESS).toBeGreaterThan(0)
  })
})
