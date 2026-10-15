import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { assertSafeBundle } from './build/client_security.mjs';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const secrets = Object.entries(env)
    .filter(([name]) => /(?:OPENAI|MISTRAL).*API_KEY/.test(name))
    .map(([, value]) => value);

  return {
    envPrefix: [],
    plugins: [react(), {
      name: 'prevent-client-api-keys',
      generateBundle(_options, bundle) {
        assertSafeBundle(bundle, secrets);
      },
    }],
  };
});
