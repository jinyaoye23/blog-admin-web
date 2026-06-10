import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  shortcuts: [
    ['btn', 'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors'],
    ['card', 'bg-white rounded-lg shadow-md p-4'],
  ],
})