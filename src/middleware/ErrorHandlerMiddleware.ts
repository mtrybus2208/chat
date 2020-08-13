import { KoaMiddlewareInterface, Ctx, Middleware } from 'routing-controllers';
import chalk from 'chalk';
@Middleware({ type: 'before' })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  async use(@Ctx() ctx: any, next: (err?: any) => Promise<any>): Promise<void> {
    try {
      await next();
    } catch (err) {
      console.log(chalk.italic.red(err.message));
      ctx.status = err.code;
      ctx.body = err;
    }
  }
}
