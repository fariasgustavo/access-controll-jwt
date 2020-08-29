import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const databaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

export default databaseConfig;
