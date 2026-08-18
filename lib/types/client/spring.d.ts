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
    position: number;
    /** Current velocity (units per second). */
    velocity: number;
}
/** Spring stiffness (higher = faster settle). */
export declare const SPRING_STIFFNESS = 260;
/** Damping ratio: 1 = critical damping (fastest settle without overshoot). */
export declare const SPRING_DAMPING_RATIO = 1;
/** Snap distance under which the spring locks to the target. */
export declare const SPRING_SNAP_DISTANCE = 0.05;
/** Snap velocity under which the spring locks to the target. */
export declare const SPRING_SNAP_VELOCITY = 0.5;
/** Simulation step cap, seconds (substepped for stability). */
export declare const SPRING_STEP: number;
/**
 * Create a spring resting exactly on a value.
 * @param target - initial position.
 * @returns a settled spring state.
 */
export declare function createSpring(target: number): SpringState;
/**
 * Advance one spring toward a target by `dt` seconds (semi-implicit Euler
 * with fixed substeps; the step cap keeps large frame gaps stable).
 * @param state - current spring state (mutated in place).
 * @param target - desired position.
 * @param dt - elapsed seconds since the previous frame.
 * @returns the same state object, advanced.
 */
export declare function advanceSpring(state: SpringState, target: number, dt: number): SpringState;
/**
 * Whether a spring has settled exactly on its target.
 * @param state - spring state to check.
 * @param target - the target the spring was chasing.
 * @returns true when position equals target and velocity is zero.
 */
export declare function springSettled(state: SpringState, target: number): boolean;
/**
 * Bound a value into [min, max], returning `fallback` for non-finite input.
 * @param value - value to clamp.
 * @param min - inclusive lower bound.
 * @param max - inclusive upper bound.
 * @param fallback - value returned when input is not a finite number.
 * @returns the clamped value.
 */
export declare function clampValue(value: number, min: number, max: number, fallback: number): number;
//# sourceMappingURL=spring.d.ts.map