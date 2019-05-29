import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';
import koaWebpack from 'koa-webpack';
import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export default () => {
  dotenv.config();

  const isDevelopment = process.env.NODE_ENV === 'development';

  const pathForPublicFiles = path.resolve(__dirname, 'public');

  const pug = new Pug({
    viewPath: path.resolve(__dirname, '..', '..', 'views'),
    debug: isDevelopment,
    noCache: isDevelopment,
  });

  const app = new Koa();
  const router = new Router();
  const apiRouter = new Router();

  apiRouter
    .get('exchangeRates', '/exch-rates', async (ctx) => {
      ctx.body = { usdExchangeRate: 64.5394, eurExchangeRate: 72.1680 };
    });

  router
    .get('index', '/', async (ctx) => {
      const ticketsJSON = await fs.promises.readFile(path.resolve(__dirname, '..', '..', 'data', 'tickets.json'), 'UTF-8');
      ctx.render('index', { gon: JSON.parse(ticketsJSON) });
    })
    .use('/api', apiRouter.routes(), apiRouter.allowedMethods());

  app.use(logger());
  if (isDevelopment) {
    koaWebpack().then((middleware) => {
      app.use(middleware);
    });
  } else {
    app.use(mount('/assets', serve(pathForPublicFiles)));
  }
  app.use(router.routes());
  app.use(router.allowedMethods());
  pug.use(app);

  return http.createServer(app.callback());
};
