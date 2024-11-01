export const configuration = () => ({
  port: parseInt(process.env['SERVER_PORT'] || '3001', 10),
  authStrategy: process.env['AUTH_STRATEGY'] || 'mock',
  jwtSecretKey: process.env['JWT_SECRET_KEY'] || 'your_jwt_secret_key',
  sessionSecret: process.env['SESSION_SECRET'] || 'your_session_secret',
  appSecretKey: process.env['APP_SECRET_KEY'] || 'peanutbutter',
  oktaIssuerUrl: process.env['OKTA_ISSUER_URL'] || 'https://your-okta-domain/oauth2/default',
  oktaClientId: process.env['OKTA_CLIENT_ID'] || 'your_client_id',
});

