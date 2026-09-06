import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        bane: "NovaGadget",
        short_name: "NovaGadget",
        description: "NovaGadget Electronics Store",
        theme_color: "ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa-192×192.png",
            sizes: "192×192",
            type: "image/png",
          },
          {
            src: "/pwa-512×512.png",
            sizes: "512×512",
            type: "image/png",
          },
        ]
      }
    })
  ],
})
