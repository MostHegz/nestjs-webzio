import { Module } from '@nestjs/common';
import { PostMapper, ThreadMapper } from './entity-mappers';
import { SocialDataMapper } from './entity-mappers/social-data.mapper';

@Module({
  providers: [ThreadMapper, PostMapper, SocialDataMapper],
  exports: [ThreadMapper, PostMapper, SocialDataMapper],
})
export class MappersModule {}
