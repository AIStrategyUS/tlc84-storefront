import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

// Base path for GitHub Pages project sites must be "/<repo-name>/". The repo
// name lives in package.json's "name" field so it's defined in exactly one
// place; VITE_BASE_PATH can override it for local/other-host builds.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))
const base = process.env.VITE_BASE_PATH ?? `/${pkg.name}/`

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
