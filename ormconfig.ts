import config from './src/config';

const baseConfig = {
  migrations: ['src/migrations/**/*.ts'],
  entities: ['src/**/*.entity.ts'],
  seeds: ['src/database/seeds/**/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

const env = process.env.NODE_ENV;

if (env && env.trim() === 'test') {
  module.exports = [
    {
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      logging: ['warn', 'error'],
      ...baseConfig,
    },
  ];
} else {
  module.exports = [
    {
      type: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
      logging: false,
      ...baseConfig,
    },
  ];
}
