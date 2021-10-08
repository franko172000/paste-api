import { createConnection } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { useContainer } from 'typeorm';

/**
 * Exports TypeORM db configurations
 */
export default async () => {
  /**
   * Use TypeDI as TypeORM dependency injector
   */
  useContainer(Container);
  return createConnection();
};
