import { createConnection, Connection } from 'typeorm';
import * as env from 'env-var';

export class DatabaseConnection {
  static create(): Promise<Connection> {
    return createConnection({
      type: 'postgres',
      host: env.get('DB_HOST').asString(),
      port: env.get('DB_PORT').asPortNumber(),
      database: env.get('DB_NAME').asString(),
      username: env.get('DB_USER').asString(),
      password: env.get('DB_PASS').asString(),
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
  }
}
