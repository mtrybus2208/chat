import 'reflect-metadata';
import { Action, createKoaServer, useContainer } from 'routing-controllers';
import { UsersController } from '../controller/UsersController';
import { Container } from 'typedi';

import { ErrorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import * as config from 'config';

export class Application {
  public appContext: any;

  public async start(): Promise<void> {
    const port = config.get('app.port');
    const appName = config.get('app.name');

    const app = createKoaServer({
      controllers: [UsersController], // we specify controllers we want to use
      middlewares: [ErrorHandlerMiddleware],
      defaultErrorHandler: false,
    });

    this.appContext = app.listen(port, () => {
      console.log(`${appName} server runs on port ${port}`);
    });
  }

  // run express application on port 3000
}
