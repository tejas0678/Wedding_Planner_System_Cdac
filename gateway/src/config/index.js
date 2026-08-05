require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  fallbackPort: process.env.FALLBACK_PORT || 8082,
  springBackendUrl: process.env.SPRING_BACKEND_URL || 'http://localhost:8081',
  dotnetBackendUrl: process.env.DOTNET_BACKEND_URL || 'http://localhost:5000',
  jwtSecret: process.env.JWT_SECRET || 'weddingPlannerAuthServiceSuperSecretJwtKey2026MustBeAtLeast256BitsLongForHmacSha256'
};
