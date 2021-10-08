import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import config from '../config';
import { useContainer, useExpressServer } from 'routing-controllers';
import Container from 'typedi';
import cors from 'cors';

export default (app: express.Application): void => {
  //set helmet
  app.use(helmet());
  //set express json
  app.use(express.json());
  //set body paerser
  app.use(bodyParser.json());
  //use cors
  app.use(cors());

  //Let routing controller use TypeDI as dependency injector
  useContainer(Container);

  /**
   * Intialise routing controller
   */
  useExpressServer(app, {
    //set up base path
    routePrefix: config.api.prefix,
    defaultErrorHandler: false, // disable default error handler
    //register all controllers
    controllers: [process.cwd() + '/src/**/*.controller.ts'],
    //register all middlewares
    middlewares: [process.cwd() + '/src/**/*.middleware.ts'],
    //register all interceptors
    interceptors: [process.cwd() + '/src/**/*.interceptor.ts'],
  });
};
