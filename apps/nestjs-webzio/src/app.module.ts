import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '@app/entities';
import { HttpModule } from '@nestjs/axios';
import { WebzioClientModule } from '@app/webzio-client';
import { WebzioModule } from './webzio/webzio.module';
import { MappersModule } from '@app/mappers';
import { RepositoriesModule } from '@app/repositories';
import { APP_FILTER } from '@nestjs/core';
import {
  AxiosExceptionFilter,
  TypeORMExceptionFilter,
  HttpExceptionFilter,
} from './exception-filters';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    HttpModule,
    WebzioClientModule,
    WebzioModule,
    MappersModule,
    RepositoriesModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AxiosExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeORMExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
