import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PostEntity } from '@app/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class PostRepository extends BaseRepository<PostEntity> {
  constructor(dataSource: DataSource) {
    super(PostEntity, dataSource, 'post');
  }
}
