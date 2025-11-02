import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const useMock = env.USE_DEV_MOCK === 'true';

  return {
    plugins:  [
      react(),
      {
        name: 'dev-mock-middleware',
        apply: 'serve',
        configureServer(server) {
          if (!useMock) return;

          server.middlewares.use((req, res, next) => {
            // In dev we want to serve the app as if it's at root
            if (req.url && req.url.startsWith('/portfool-io/')) {
              req.url = req.url.replace(/^\/portfool-io\//, '/');
            }

            // Mock API for services
            if (req.url && req.url.startsWith('/api/services')) {
              res.setHeader('Content-Type', 'application/json');
              try {
                const raw = env.SERVICES;
                const data = raw ? JSON.parse(raw) : [];
                res.statusCode = 200;
                res.end(JSON.stringify(data));
              } catch (e) {
                res.statusCode = 500;
                const message = e instanceof Error ? e.message : String(e);
                res.end(JSON.stringify({ error: 'Failed to parse SERVICES environment variable as JSON', message }));
              }
              return; 
            }

            // Used for testing
            if (req.url === '/mock-endpoint') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
              return;
            }

            next();
          });
        },
      },
    ],
    base: mode === 'development' ? '/' : '/portfool-io/',
  };
});