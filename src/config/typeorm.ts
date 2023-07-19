import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = process.env.DB_URL
  ? {
      url: process.env.DB_URL,
      type: 'mysql',
      synchronize: true,
      logging: true,
    }
  : {
      type: 'mysql',
      host: process.env.DB_HOST || '',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || '',
      database: process.env.DB_NAME || '',
      password: process.env.DB_PASSWORD || '',
      synchronize: true,
      logging: true,
    };

export const typeOrmConfig: TypeOrmModuleOptions = config;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    let config: TypeOrmModuleOptions;

    // const isDevEnv =
    //   process.env.APP_ENV && process.env.APP_ENV.toLowerCase() === 'dev'
    //     ? true
    //     : false;

    if (process.env.DB_URL) {
      config = {
        url: process.env.DB_URL,
        type: 'mysql',
        synchronize: true,
        logging: true,
      };
    } else {
      config = {
        type: 'mysql',
        host: process.env.DB_HOST || '',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USER || '',
        database: process.env.DB_DATABASENAME || '',
        password: process.env.DB_PASSWORD || '',
        synchronize: true,
        logging: true,

        // entities
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
      };
    }

    return config;
  },
};
