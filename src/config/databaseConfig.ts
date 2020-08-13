import { ConnectionOptions } from 'typeorm';

import * as config from 'config';

export interface DatabaseCredentials {
  dbPassword: string;
  dbUSer: string;
}

export const databaseconfig = (credentials: DatabaseCredentials): ConnectionOptions => ({
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  database: config.get('db.name'),
  username: credentials.dbUSer,
  password: credentials.dbPassword,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
});
