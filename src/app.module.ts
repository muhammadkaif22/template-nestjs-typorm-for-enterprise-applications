import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SimpleModule } from './modules/simple/simple.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';
import { typeOrmConfig } from './config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // config
    // Config Module
    // Docs -> https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeOrm Module
    // Docs -> https://docs.nestjs.com/recipes/sql-typeorm
    // TypeOrmModule.forRootAsync(typeOrmConfig),

    // Rate Limiter
    // Docs -> https://docs.nestjs.com/security/rate-limiting
    ThrottlerModule.forRoot(),

    // Global modules
    SimpleModule,
    HealthCheckModule,

    // your can create route just like angular
    // Router Module
    // Docs -> https://docs.nestjs.com/recipes/router-module
    // RouterModule.register([
    //   {
    //     path: 'admin',
    //     module: AdminModule,
    //     children: [
    //       {
    //         path: 'dashboard',
    //         module: DashboardModule,
    //       },
    //       {
    //         path: 'metrics',
    //         module: MetricsModule,
    //       },
    //     ],
    //   },
    // ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
