import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { transform } from 'lightningcss'
import { defineConfig, type UserConfig } from 'tsdown'

const PLUGIN_ID = '@deepseek-ai/dsh-client-ui-prism'
const CLIENT_EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-store',
  '@deepseek-ai/dsh-client-ui-primitives',
] as const

const CSS_PREFIX = '\0prism-css:'
const CSS_SUFFIX = '.mjs'

function styleModule(file: string, css: string, classMap?: Record<string, string>): string {
  const tagId = `${PLUGIN_ID}/${basename(file)}`
  return [
    `const css = ${JSON.stringify(css)};`,
    `const tagId = ${JSON.stringify(tagId)};`,
    'if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {',
    '  const tag = document.createElement("style");',
    `  tag.dataset.plugin = ${JSON.stringify(PLUGIN_ID)};`,
    '  tag.dataset.pluginCss = tagId;',
    '  tag.textContent = css;',
    '  document.head.appendChild(tag);',
    '}',
    classMap === undefined ? 'export {};' : `export default ${JSON.stringify(classMap)};`,
  ].join('\n')
}

const cssPlugin = {
  name: 'prism-css-modules-inline',
  resolveId(source: string, importer: string | undefined) {
    if (!source.endsWith('.css')) return null
    const file = importer === undefined ? source : resolve(importer, '..', source)
    return CSS_PREFIX + file + CSS_SUFFIX
  },
  async load(this: { addWatchFile: (file: string) => void }, id: string) {
    if (!id.startsWith(CSS_PREFIX)) return null
    const file = id.slice(CSS_PREFIX.length, -CSS_SUFFIX.length)
    this.addWatchFile(file)
    const isModule = file.endsWith('.module.css')
    const { code, exports } = transform({
      filename: file,
      code: await readFile(file),
      cssModules: isModule ? { pattern: '[hash]_[local]' } : false,
      minify: true,
    })
    const classMap: Record<string, string> = {}
    if (isModule) {
      for (const [local, entry] of Object.entries(exports ?? {})) classMap[local] = entry.name
    }
    return styleModule(file, code.toString(), isModule ? classMap : undefined)
  },
}

const host: UserConfig = {
  name: PLUGIN_ID,
  entry: ['src/index.ts', 'src/invariant.ts'],
  outDir: 'lib',
  format: 'esm',
  platform: 'node',
  target: 'es2024',
  dts: false,
  clean: true,
  outputOptions: { entryFileNames: '[name].js' },
}

const client: UserConfig = {
  name: `${PLUGIN_ID}/client`,
  entry: { client: 'src/client/index.ts' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  target: 'es2024',
  dts: false,
  sourcemap: true,
  clean: false,
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production') },
  deps: {
    neverBundle: [...CLIENT_EXTERNALS],
    alwaysBundle: (id: string) => !CLIENT_EXTERNALS.some(external => external === id),
  },
  plugins: [cssPlugin],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
}

export default defineConfig([host, client])
