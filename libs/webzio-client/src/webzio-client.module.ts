import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebzioNewsClient } from './client/webzio-news.client';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [HttpModule, ConfigModule, LoggerModule],
  providers: [WebzioNewsClient],
  exports: [WebzioNewsClient],
})
export class WebzioClientModule {}
