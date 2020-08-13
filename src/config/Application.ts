import 'reflect-metadata';
import { createKoaServer, useContainer } from 'routing-controllers';
import { createConnection, useContainer as useTypeOrmContainer, Connection } from 'typeorm';
import { Container } from 'typedi';
import * as cors from '@koa/cors';
import * as config from 'config';
import { config as dotEnvconfig } from 'dotenv';
import * as env from 'env-var';

import { ErrorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { databaseconfig } from './databaseConfig';
import { UsersController } from '../controller/UsersController';

export class Application {
  public appContext: any;
  public databaseConnection: Connection;

  public async start(): Promise<void> {
    try {
      dotEnvconfig();
      const port = config.get('app.port');
      const appName = config.get('app.name');

      useContainer(Container);
      useTypeOrmContainer(Container);

      this.databaseConnection = await createConnection(
        databaseconfig({
          dbPassword: env.get('DB_PASS').asString(),
          dbUSer: env.get('DB_USER').asString(),
        }),
      );

      const app = await createKoaServer({
        controllers: [UsersController],
        middlewares: [ErrorHandlerMiddleware, cors],
        defaultErrorHandler: false,
      });
      app.use(cors());

      this.appContext = app.listen(port, () => {
        console.log(`${appName} server runs on port ${port}`);
      });
    } catch (e) {
      console.error(`Connection error: ${e}`);
    }
  }

  public async close(): Promise<void> {
    const appName = config.get('app.name');

    try {
      await this.databaseConnection.close();
      await this.appContext.close();
      console.log(`${appName} server stopped`);
    } catch (e) {
      console.error(`close error: ${e}`);
    }
  }
}
