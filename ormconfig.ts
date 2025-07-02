import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT||5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./libs/entities/**/*.entity.{ts,js}'],
  migrations: ['./migrations/**/*.ts'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
});
