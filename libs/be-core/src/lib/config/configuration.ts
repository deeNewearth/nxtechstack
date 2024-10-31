export const configuration = () => ({
  port: parseInt(process.env['SERVER_PORT'] || '3001', 10),
  authStrategy: process.env['AUTH_STRATEGY'] || 'mock',
});

