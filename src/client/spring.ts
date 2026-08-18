/**
 * Damped knob engine: a critically damped spring integrator per numeric knob.
 * The settings UI writes target values; the layer advances each spring on a
 * requestAnimationFrame loop and applies the smooth positions to CSS
 * variables, so every slider drag settles with a weighty glide instead of a
 * hard jump. Pure math — no DOM, no timers — so tests run in node.
 */

/** One spring's state: current position and velocity. */
export interface SpringState {
  /** Current output position. */
  position: number
  /** Current velocity (units per second). */
  velocity: number
}

/** Spring stiffness (higher = faster settle). */
export const SPRING_STIFFNESS = 260
/** Damping ratio: 1 = critical damping (fastest settle without overshoot). */
export const SPRING_DAMPING_RATIO = 1
/** Snap distance under which the spring locks to the target. */
export const SPRING_SNAP_DISTANCE = 0.05
/** Snap velocity under which the spring locks to the target. */
export const SPRING_SNAP_VELOCITY = 0.5
/** Simulation step cap, seconds (substepped for stability). */
export const SPRING_STEP = 1 / 120

/**
 * Create a spring resting exactly on a value.
 * @param target - initial position.
 * @returns a settled spring state.
 */
export function createSpring(target: number): SpringState {
  return { position: target, velocity: 0 }
}

/**
 * Advance one spring toward a target by `dt` seconds (semi-implicit Euler
 * with fixed substeps; the step cap keeps large frame gaps stable).
 * @param state - current spring state (mutated in place).
 * @param target - desired position.
 * @param dt - elapsed seconds since the previous frame.
 * @returns the same state object, advanced.
 */
export function advanceSpring(state: SpringState, target: number, dt: number): SpringState {
  if (dt <= 0) return state
  const damping = 2 * Math.sqrt(SPRING_STIFFNESS) * SPRING_DAMPING_RATIO
  const steps = Math.max(1, Math.ceil(dt / SPRING_STEP))
  const h = dt / steps
  for (let i = 0; i < steps; i += 1) {
    const acceleration = SPRING_STIFFNESS * (target - state.position) - damping * state.velocity
    state.velocity += acceleration * h
    state.position += state.velocity * h
  }
  if (Math.abs(target - state.position) < SPRING_SNAP_DISTANCE && Math.abs(state.velocity) < SPRING_SNAP_VELOCITY) {
    state.position = target
    state.velocity = 0
  }
  return state
}

/**
 * Whether a spring has settled exactly on its target.
 * @param state - spring state to check.
 * @param target - the target the spring was chasing.
 * @returns true when position equals target and velocity is zero.
 */
export function springSettled(state: SpringState, target: number): boolean {
  return state.position === target && state.velocity === 0
}

/**
 * Bound a value into [min, max], returning `fallback` for non-finite input.
 * @param value - value to clamp.
 * @param min - inclusive lower bound.
 * @param max - inclusive upper bound.
 * @param fallback - value returned when input is not a finite number.
 * @returns the clamped value.
 */
export function clampValue(value: number, min: number, max: number, fallback: number): number {
  const n = Number(value)
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : fallback))
}
