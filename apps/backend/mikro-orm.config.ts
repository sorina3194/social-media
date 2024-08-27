import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  entities: ['./dist/modules/**/*.entity.js'],
  entitiesTs: ['./src/modules/**/*.entity.ts'],
  host: 'localhost',
  port: 5432,
  dbName: 'social-media',
  user: 'dbadmin',
  password: 'password',
  driver: PostgreSqlDriver,
  validate: true,
  extensions: [Migrator],
});
