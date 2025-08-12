import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as sass from 'sass';

import * as path from 'path';

export function vitePluginExportScss() {
  return {
    name: 'vite-plugin-scss',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/export.css') {
          try {
            const scssFilePath = 'src/styles/export.scss'; // adjust the path to your SCSS file
            const result = sass.compile(scssFilePath);

            res.setHeader('Content-Type', 'text/css');
            res.end(result.css);
          } catch (err) {
            res.statusCode = 500;
            res.end(err.message);
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: { exportType: 'default' } }), vitePluginExportScss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'common': path.resolve(__dirname, '../common/src/'),
    },
  },
});
