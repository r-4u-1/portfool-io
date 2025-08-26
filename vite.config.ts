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

          server.middlewares.use('/api/services', (req, res) => {
            try {
              const data = JSON.parse(env.SERVICES ?? '[]');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Invalid SERVICES' }));
            }
          });
        },
      },
    ],
    base: '/portfool-io/',
  };
});