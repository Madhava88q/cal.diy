export const productionSecurityConfig = {
  jwtSecret: process.env.JWT_SECRET || "changeme",
  allowedOrigin: process.env.ALLOWED_ORIGIN || "*",
  serviceUrl: process.env.SERVICE_URL || "http://localhost:3000",
};
