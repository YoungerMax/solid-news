import { defineConfig } from 'vite';

import solidPlugin from 'vite-plugin-solid';
import WindiCSS from 'vite-plugin-windicss';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS(),
    VitePWA({
      registerType: 'autoUpdate',
      minify: true,
      strategies: 'generateSW',
      injectRegister: null,

      manifest: {
        background_color: '#2C4F7C',
        theme_color: '#2C4F7C',

        short_name: 'Solid News',
        name: 'Solid News',
        description: 'Read stories from Hacker News',

        display: 'standalone',
        orientation: "portrait",

        icons: [
          {
            src: "/images/logo.svg",
            type: "image/svg+xml",
            sizes: "512x512"
          },
          {
            src: "/images/logo-512.png",
            type: "image/png",
            sizes: "512x512"
          },
          {
            src: "/images/logo-192.png",
            type: "image/png",
            sizes: "192x192"
          }
        ],

        screenshots: [
            {
                src: "/images/cover.png",
                type: "image/png",
                sizes: "1200x628"
            }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
