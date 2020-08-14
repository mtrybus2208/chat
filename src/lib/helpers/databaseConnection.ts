import { createConnection, Connection } from 'typeorm';
import * as env from 'env-var';
import * as config from 'config';

export class DatabaseConnection {
  static create(): Promise<Connection> {
    const entities: string[] = config.get('typeorm.entities');
    const migrations: string[] = config.get('typeorm.migrations');
    const subscribers: string[] = config.get('typeorm.subscribers');

    console.log({
      host: env.get('DB_HOST').asString(),
      port: env.get('DB_PORT').asPortNumber(),
      database: env.get('DB_NAME').asString(),
      username: env.get('DB_USER').asString(),
      password: env.get('DB_PASS').asString(),
    });

    return createConnection({
      type: 'postgres',
      host: env.get('DB_HOST').asString(),
      port: env.get('DB_PORT').asPortNumber(),
      database: env.get('DB_NAME').asString(),
      username: env.get('DB_USER').asString(),
      password: env.get('DB_PASS').asString(),
      synchronize: true,
      logging: true,
      entities: entities,
      migrations: migrations,
      subscribers: subscribers,

      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
    });
  }
}
