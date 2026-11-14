/** Token derivation engine: structure and knob-variable contracts. */
import { describe, expect, it } from 'vitest'
import { buildTokenOverrides } from '../src/client/tokens.ts'

describe('buildTokenOverrides', () => {
  const overrides = buildTokenOverrides()
  const token = (name: string) => {
    const value = overrides[name]
    if (value === undefined) throw new Error(`missing token ${name}`)
    return value
  }

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
      expect(token('--dsw-alias-brand-primary')[mode]).toContain('var(--prism-accent-h)')
      expect(token('--dsw-alias-brand-primary')[mode]).toContain('var(--prism-accent-s)')
      expect(token('--dsw-alias-brand-primary')[mode]).toContain('var(--prism-accent-l)')
      expect(token('--dsw-alias-state-business-primary')[mode]).toContain('var(--prism-accent-h)')
    }
  })

  it('surfaces scale by frost, depth, and their per-zone knobs', () => {
    expect(token('--dsw-alias-bg-layer-1').dark).toContain('var(--prism-zone-base')
    expect(token('--dsw-alias-bg-layer-2').dark).toContain('var(--prism-zone-card')
    expect(token('--dsw-specific-input-major').light).toContain('var(--prism-zone-input')
    expect(token('--dsw-specific-menu').dark).toContain('var(--prism-zone-overlay')
    expect(token('--dsw-specific-bubble').dark).toContain('var(--prism-zone-bubble')
    expect(token('--dsw-alias-bg-overlay').light).toContain('var(--prism-frost)')
  })

  it('all chrome surfaces share one canonical dark glass color', () => {
    for (const name of ['--dsw-alias-bg-layer-1', '--dsw-specific-input-major', '--dsw-specific-menu', '--dsw-specific-bubble']) {
      expect(token(name).dark).toContain('rgb(34 38 47')
      void name
    }
  })

  it('primary ink rides the per-mode ink color knobs', () => {
    expect(token('--dsw-alias-label-primary').light).toContain('var(--prism-ink-light-h)')
    expect(token('--dsw-alias-label-primary').light).toContain('var(--prism-ink-light-l)')
    expect(token('--dsw-alias-label-primary').dark).toContain('var(--prism-ink-dark-h)')
    expect(token('--dsw-alias-label-primary').dark).toContain('var(--prism-ink-dark-l)')
  })

  it('accent surfaces carry the accent opacity knob', () => {
    expect(token('--dsw-alias-brand-primary').light).toContain('var(--prism-accent-a')
    expect(token('--dsw-alias-button-primary-fill').dark).toContain('var(--prism-accent-a')
  })

  it('the sidebar fill turns transparent (the glass lives on the column)', () => {
    expect(token('--dsw-specific-sidebar-fill').light).toBe('transparent')
    expect(token('--dsw-specific-sidebar-fill').dark).toBe('transparent')
  })

  it('covers the DSH 0.2.2-rc.3 sidebar and card tokens without dropping rc.1 compatibility', () => {
    for (const name of [
      '--dsw-specific-sidebar-nav-item-hover',
      '--dsw-specific-sidebar-glass-fill',
      '--dsw-specific-sidebar-glass-hover',
      '--dsw-specific-sidebar-glass-collapsed-hover',
      '--dsw-alias-card-fill',
      '--dsw-alias-card-fill-hover',
    ]) {
      expect(token(name).light).toContain('var(--prism-')
      expect(token(name).dark).toContain('var(--prism-')
    }
    expect(token('--dsw-specific-sidebar-glass-collapsed-fill').light).toBe('transparent')
    expect(token('--dsw-alias-border-selected').dark).toContain('var(--prism-accent-h)')
    expect(token('--dsw-alias-hovercard-bg').dark).toContain('var(--prism-zone-overlay')
    expect(token('--dsw-specific-file-upload-track').light).toBe('rgb(19 45 83 / 0.08)')
  })

  it('re-hangs the macOS column glass on the rc.3 tint hook', () => {
    // The Darwin frame paints the sidebar column itself; the tint must carry
    // the same frosted fill the column rule paints on Web.
    expect(token('--dsw-specific-sidebar-tint').light).toContain('var(--prism-frost)')
    expect(token('--dsw-specific-sidebar-tint').dark).toContain('rgb(34 38 47')
    for (const name of [
      '--dsw-specific-sidebar-wash-top',
      '--dsw-specific-sidebar-wash-top-clear',
      '--dsw-specific-sidebar-wash-bottom',
      '--dsw-specific-sidebar-wash-bottom-clear',
    ]) {
      expect(token(name).light).toBe('transparent')
      expect(token(name).dark).toBe('transparent')
    }
  })

  it('font families ride the knob variables', () => {
    expect(token('--dsw-font-family').dark).toContain('var(--prism-font-family)')
    expect(token('--ds-font-family-code').light).toContain('var(--prism-code-family)')
  })

  it('borders carry neutral fixed strengths', () => {
    expect(token('--dsw-alias-border-l1').dark).toContain('rgb(148 180 220 / calc(0.06 + 0.08 * 0.5))')
    expect(token('--dsw-alias-border-l3').light).toContain('0.14 + 0.10 * 0.5')
  })
})
