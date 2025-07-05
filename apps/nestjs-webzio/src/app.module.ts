import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '@app/entities';
import { HttpModule } from '@nestjs/axios';
import { WebzioClientModule } from '@app/webzio-client';
import { WebzioModule } from './webzio/webzio.module';
import { MappersModule } from '@app/mappers';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    HttpModule,
    WebzioClientModule,
    WebzioModule,
    MappersModule,
    RepositoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
