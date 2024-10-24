export const configuration = () => ({
  port: parseInt(process.env['SERVER_PORT'] || '3001', 10),
});
