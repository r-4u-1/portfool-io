import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/portfool-io/', 
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // load ALL keys, not just VITE_*

  const useMock = env.USE_DEV_MOCK === 'true';

  return {
    plugins:  [
      react(),
      {
        name: 'dev-mock-middleware',
        apply: 'serve', // only in `vite dev`
        configureServer(server) {
          if (!useMock) return;

          server.middlewares.use((req, res, next) => {
            // Example mock middleware logic
            if (req.url === '/mock-endpoint') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to parse SERVICES environment variable as JSON' }));
            } else {
              next();
            }
          });
        },
      },
    ],
    base: '/portfool-io/',
  };
});