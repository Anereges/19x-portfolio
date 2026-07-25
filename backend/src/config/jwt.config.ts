import dotenv from 'dotenv';

dotenv.config();

interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || 'default-secret-change-this-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-change-this',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
};

export default jwtConfig;