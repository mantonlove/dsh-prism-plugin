/** Token derivation engine: structure and knob-variable contracts. */
import { describe, expect, it } from 'vitest'
import { buildTokenOverrides } from '../src/client/tokens.ts'

describe('buildTokenOverrides', () => {
  const overrides = buildTokenOverrides()

  it('every token maps to a { light, dark } pair of strings', () => {
    expect(Object.keys(overrides).length).toBeGreaterThan(60)
    for (const [name, modes] of Object.entries(overrides)) {
      expect(typeof modes.light).toBe('string')
      expect(typeof modes.dark).toBe('string')
      void name
    }
  })

  it('accent tokens carry the full user accent color', () => {
    for (const mode of ['light', 'dark'] as const) {
      expect(overrides['--dsw-alias-brand-primary'][mode]).toContain('var(--prism-accent-h)')
      expect(overrides['--dsw-alias-brand-primary'][mode]).toContain('var(--prism-accent-s)')
      expect(overrides['--dsw-alias-brand-primary'][mode]).toContain('var(--prism-accent-l)')
      expect(overrides['--dsw-alias-state-business-primary'][mode]).toContain('var(--prism-accent-h)')
    }
  })

  it('surfaces scale by frost, depth, and their per-zone knobs', () => {
    expect(overrides['--dsw-alias-bg-layer-1'].dark).toContain('var(--prism-zone-base')
    expect(overrides['--dsw-alias-bg-layer-2'].dark).toContain('var(--prism-zone-card')
    expect(overrides['--dsw-specific-input-major'].light).toContain('var(--prism-zone-input')
    expect(overrides['--dsw-specific-menu'].dark).toContain('var(--prism-zone-overlay')
    expect(overrides['--dsw-specific-bubble'].dark).toContain('var(--prism-zone-bubble')
    expect(overrides['--dsw-alias-bg-overlay'].light).toContain('var(--prism-frost)')
  })

  it('all chrome surfaces share one canonical dark glass color', () => {
    for (const name of ['--dsw-alias-bg-layer-1', '--dsw-specific-input-major', '--dsw-specific-menu', '--dsw-specific-bubble']) {
      expect(overrides[name].dark).toContain('rgb(34 38 47')
      void name
    }
  })

  it('primary ink rides the per-mode ink color knobs', () => {
    expect(overrides['--dsw-alias-label-primary'].light).toContain('var(--prism-ink-light-h)')
    expect(overrides['--dsw-alias-label-primary'].light).toContain('var(--prism-ink-light-l)')
    expect(overrides['--dsw-alias-label-primary'].dark).toContain('var(--prism-ink-dark-h)')
    expect(overrides['--dsw-alias-label-primary'].dark).toContain('var(--prism-ink-dark-l)')
  })

  it('accent surfaces carry the accent opacity knob', () => {
    expect(overrides['--dsw-alias-brand-primary'].light).toContain('var(--prism-accent-a')
    expect(overrides['--dsw-alias-button-primary-fill'].dark).toContain('var(--prism-accent-a')
  })

  it('the sidebar fill turns transparent (the glass lives on the column)', () => {
    expect(overrides['--dsw-specific-sidebar-fill'].light).toBe('transparent')
    expect(overrides['--dsw-specific-sidebar-fill'].dark).toBe('transparent')
  })

  it('font families ride the knob variables', () => {
    expect(overrides['--dsw-font-family'].dark).toContain('var(--prism-font-family)')
    expect(overrides['--ds-font-family-code'].light).toContain('var(--prism-code-family)')
  })

  it('borders carry neutral fixed strengths', () => {
    expect(overrides['--dsw-alias-border-l1'].dark).toContain('rgb(148 180 220 / calc(0.06 + 0.08 * 0.5))')
    expect(overrides['--dsw-alias-border-l3'].light).toContain('0.14 + 0.10 * 0.5')
  })
})
