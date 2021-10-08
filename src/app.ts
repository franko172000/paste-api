import 'reflect-metadata';
import express from 'express';
import config from './config';
import loader from './loaders';
let env = process.env.NODE_ENV;
env = env.trim();
export const app = express();

export const startServer = async () => {
  //load initial dependencies
  await loader(app);

  /**
   * Get port from environment and store in Express.
   */
  const port = env === 'test' ? config.testPort : config.port;
  //const server = http.createServer(app);

  return app.listen(port, () => {
    console.log('Listening on ' + port);
  });
};

// console.log(env.trim());

if (env.trim() !== 'test'){
  startServer()
}

