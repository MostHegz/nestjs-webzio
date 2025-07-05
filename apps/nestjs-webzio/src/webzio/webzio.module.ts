import { Module } from '@nestjs/common';
import { WebzioController } from './webzio.controller';
import { WebzioService } from './webzio.service';
import { HttpModule } from '@nestjs/axios';
import { WebzioClientModule } from '@app/webzio-client';
import { ConfigModule } from '@nestjs/config';
import { MappersModule } from '@app/mappers';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [
    WebzioClientModule,
    HttpModule,
    ConfigModule,
    MappersModule,
    RepositoriesModule,
  ],
  controllers: [WebzioController],
  providers: [WebzioService],
})
export class WebzioModule {}
