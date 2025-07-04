import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebzioNewsClient } from './client/webzio-news.client';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [WebzioNewsClient],
  exports: [WebzioNewsClient],
})
export class WebzioClientModule {}
