
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/handler.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/handler.js',
  external: ['aws-sdk'], // AWS SDK is available in the Lambda runtime
}).catch(() => process.exit(1));