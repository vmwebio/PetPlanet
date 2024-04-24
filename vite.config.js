import { defineConfig } from "vite";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import cleanPlugin from 'vite-plugin-clean';

export default defineConfig({
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
    },
    plugins: [
        [
            cleanPlugin()
        ],
        ViteImageOptimizer({
            svg: {
                multipass: true,
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        cleanupNumericValues: false,
                        removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                      },
                      cleanupIDs: {
                        minify: false,
                        remove: false,
                      },
                      convertPathData: false,
                    },
                  },
                  'sortAttrs',
                  {
                    name: 'addAttributesToSVGElement',
                    params: {
                      attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                    },
                  },
                ],
              },
            webp: {
                // https://sharp.pixelplumbing.com/api-output#webp
                lossless: true,
              },
        }),
      ],
})